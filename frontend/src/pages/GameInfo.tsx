import {useParams} from "react-router-dom";
import {useState, useEffect} from "react";
import ErrorMessage from "../components/ErrorMessage";
import {COOKIE_TOKEN_NAME, USERGAMESURL, GAMESURL} from "../constants";
import {useCookies} from "react-cookie";

function Platforms({data}) {
    return (
        <div className="flex flex-col pt-10">
            {data.map((x, i) => (
                <div key={i} className="flex flex-col pb-5">
                    <div className="text-center h-fit text-xl">{x.platform.name}</div>
                    <div className="h-fit text-center">{new Date(x.release_date).toLocaleDateString()}</div>
                    <div className="h-fit text-center">{x.platform.description}</div>
                </div>
            ))}
        </div>
    );
}

function FavouritesButton({cookie, id, setErrorMessage}) {
    const add = async () => {
        try {
            const controller = new AbortController();
            const timeout = setTimeout(() => controller.abort(), 5000);
            await fetch(USERGAMESURL + "/add?gameId=" + id, {
                method: "POST",
                headers: {
                    Authorization: "Bearer " + cookie.AUTH_TOKEN
                },
                signal: controller.signal
            });
            clearTimeout(timeout);
        } catch (error: any) {
            if (error.name === "AbortError") {
                setErrorMessage("Connection time out");
            } else {
                setErrorMessage(error.message);
            }
        }
    };
    const remove = async () => {
        try {
            const controller = new AbortController();
            const timeout = setTimeout(() => controller.abort(), 5000);
            await fetch(USERGAMESURL + "/" + id, {
                method: "DELETE",
                headers: {
                    Authorization: "Bearer " + cookie.AUTH_TOKEN
                },
                signal: controller.signal
            });
            clearTimeout(timeout);
        } catch (error: any) {
            if (error.name === "AbortError") {
                setErrorMessage("Connection time out");
            } else {
                setErrorMessage(error.message);
            }
        }
    };
    const getAdded = async () => {
        try {
            const controller = new AbortController();
            const timeout = setTimeout(() => controller.abort(), 5000);
            const response = await fetch(USERGAMESURL + "/get", {
                method: "GET",
                headers: {
                    Authorization: "Bearer " + cookie.AUTH_TOKEN
                },
                signal: controller.signal
            });
            clearTimeout(timeout);
            const json = await response.json();
            setAdded(!!json.find((x) => x.game._id == id));
        } catch (error: any) {
            if (error.name === "AbortError") {
                setErrorMessage("Connection time out");
            } else {
                setErrorMessage(error.message);
            }
        }
    };
    const [added, setAdded] = useState(false);
    if (!cookie[COOKIE_TOKEN_NAME]) return;
    useEffect(() => {
        getAdded();
    }, []);
    if (added) {
        return (
            <button onClick={remove} className="text-center h-fit w-fit p-3 bg-blue-400 mb-4">
                Remove from favourites
            </button>
        );
    } else {
        return (
            <button onClick={add} className="text-center h-fit w-fit p-3 bg-blue-400 mb-4">
                Add to favourites
            </button>
        );
    }
}

function Requirements({data}) {
    return (
        <div className="flex flex-row pt-5">
            <div className="flex flex-col px-5">
                <div className="h-fit text-center text-xl"> Minimum </div>
                <div className="flex flex-row h-fit text-center">
                    <div>CPU:</div>
                    <div className="h-fit text-center pl-2">{data.min_cpu}</div>
                </div>
                <div className="flex flex-row h-fit text-center">
                    <div>GPU:</div>
                    <div className="h-fit text-center pl-2">{data.min_gpu}</div>
                </div>
                <div className="flex flex-row h-fit text-center">
                    <div>RAM:</div>
                    <div className="h-fit text-center pl-2">{data.min_ram}</div>
                </div>
                <div className="flex flex-row h-fit text-center">
                    <div>Storage:</div>
                    <div className="h-fit text-center pl-2">{data.min_storage}</div>
                </div>
            </div>
            <div className="flex flex-col px-5">
                <div className="h-fit text-center text-xl"> Recommended </div>
                <div className="flex flex-row h-fit text-center">
                    <div>CPU:</div>
                    <div className="h-fit text-center pl-2">{data.rec_cpu}</div>
                </div>
                <div className="flex flex-row h-fit text-center">
                    <div>GPU:</div>
                    <div className="h-fit text-center pl-2">{data.rec_gpu}</div>
                </div>
                <div className="flex flex-row h-fit text-center">
                    <div>RAM:</div>
                    <div className="h-fit text-center pl-2">{data.rec_ram}</div>
                </div>
                <div className="flex flex-row h-fit text-center">
                    <div>Storage:</div>
                    <div className="h-fit text-center pl-2">{data.rec_storage}</div>
                </div>
            </div>
        </div>
    );
}

function GameInfo() {
    const infoProps = {
        publisher: {},
        genre: {},
        platforms: [],
        requirements: {}
    };
    const {id} = useParams();
    const [info, setInfo] = useState(infoProps);
    const [cookie] = useCookies([COOKIE_TOKEN_NAME]);
    const [errorMessage, setErrorMessage] = useState<string>("");
    const getInfo = async () => {
        try {
            const controller = new AbortController();
            const timeout = setTimeout(() => controller.abort(), 5000);
            const response = await fetch(GAMESURL + "/" + id, {
                method: "GET",
                signal: controller.signal
            });
            clearTimeout(timeout);

            const json = await response.json();
            setInfo(json);
        } catch (error: any) {
            if (error.name === "AbortError") {
                setErrorMessage("Connection time out");
            } else {
                setErrorMessage(error.message);
            }
            setInfo(infoProps);
        }
    };
    useEffect(() => {
        getInfo();
    }, []);
    return (
        <>
            <ErrorMessage msg={errorMessage} />
            <div className="w-full min-h-full flex-grow">
                <div className="w-full content-center text-center text-7xl h-fit p-5">{info.title}</div>
                <div className="flex-row flex p-5 w-full h-fit">
                    <div className="h-fit w-fit flex-shrink flex-grow">
                        <div>{info.description}</div>
                        <Requirements data={info.requirements} />
                    </div>
                    <div className="px-5 w-64 flex flex-col items-center">
                        <FavouritesButton cookie={cookie} id={id} setErrorMessage={setErrorMessage} />
                        <div className="h-fit text-center text-xl pb-4">{info.genre.name}</div>
                        <div className="h-fit">
                            <div className="text-center h-fit text-xl">{info.publisher.name}</div>
                            <div className="h-fit text-center">
                                {new Date(info.publisher.established).toLocaleDateString()}
                            </div>
                            <div className="h-fit text-center">{info.publisher.description}</div>
                        </div>
                        <Platforms data={info.platforms} />
                    </div>
                </div>
            </div>
        </>
    );
}

export default GameInfo;
