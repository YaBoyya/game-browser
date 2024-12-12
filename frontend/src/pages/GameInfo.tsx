import {useParams} from "react-router-dom";
import {useState, useEffect} from "react";
import ErrorMessage from "../components/ErrorMessage";
import {COOKIE_TOKEN_NAME, USERGAMESURL, GAMESURL} from "../constants";
import {useCookies} from "react-cookie";

function Platforms({data}) {
    return (
        <div className="flex flex-col mt-3 pt-10 w-full">
            <h3 className="text-xl font-medium mb-2">Platforms:</h3>
            {data.map((x, i) => (
                <div key={i} className="flex flex-col pb-5">
                    <div className="pl-5 text-left h-fit text-xl">{x.platform.name}</div>
                    <div className="h-fit pl-8 text-left">
                        Released: {new Date(x.release_date).toLocaleDateString()}
                    </div>
                    <div className="h-fit pl-8 text-left">{x.platform.description}</div>
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
            getAdded();
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
            getAdded();
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
            <button onClick={remove} className="text-center h-fit w-fit p-3 bg-blue-400 my-4">
                Remove from favourites
            </button>
        );
    } else {
        return (
            <button onClick={add} className="text-center h-fit w-fit p-3 bg-blue-400 my-4">
                Add to favourites
            </button>
        );
    }
}

function Requirements({data}) {
    return (
        <div className="flex flex-col mt-10 w-auto px-5 py-5 bg-blue-300">
            <h2 className="font-semibold mb-6">Hardware requirements</h2>
            <div className="flex flex-row pb-3">
                <div className="flex flex-col px-5 mr-14">
                    <div className="h-fit text-left text-xl"> Minimum </div>
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
                <div className="flex flex-col px-5 mr-14">
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
            {/* <ErrorMessage msg={errorMessage} /> */}
            <div className="w-full min-h-full flex-grow">
                <div className="w-full content-center text-center text-7xl h-fit p-5">{info.title}</div>
                <div className="flex-row flex p-5 w-full h-fit">
                    <div className="h-fit w-fit flex-1">
                        <div className="text-gray-900 text-xl text-justify mr-7">
                            {info.description}
                            Lorem ipsum odor amet, consectetuer adipiscing elit. Odio tortor a pulvinar pellentesque
                            sodales natoque. Justo litora non scelerisque pulvinar dolor eu semper. Facilisis erat
                            aliquet vestibulum sociosqu nibh. Tortor porta proin dolor vitae orci nisi aliquam. Varius
                            inceptos sed class cursus lacinia conubia elit. Mattis ultrices class habitasse orci
                            phasellus venenatis iaculis tempus. Felis facilisi commodo quis ornare fusce morbi.
                            Fermentum faucibus venenatis lacinia amet ultricies litora. Id ultricies fermentum luctus
                            consequat himenaeos class volutpat. Elit eros volutpat lectus eros consectetur potenti ex
                            laoreet. Malesuada phasellus etiam dapibus odio id mattis. Leo ornare montes scelerisque
                            class; nullam ornare blandit. Pulvinar mus maximus elementum bibendum; turpis mus. Sagittis
                            risus duis adipiscing turpis sapien vehicula. Per id pellentesque condimentum parturient
                            lobortis neque sem auctor. Ullamcorper tristique consequat libero, cubilia cubilia ligula
                            sollicitudin. In mollis volutpat hac eleifend maecenas iaculis sagittis primis. Lacinia
                            efficitur aenean arcu mi tempor. Etiam felis purus consectetur ut varius. Massa dictumst
                            vehicula turpis sollicitudin egestas mi ridiculus dolor nostra. Enim sapien amet magna
                            taciti hac ornare sociosqu aliquam. Efficitur quis erat ultrices risus felis venenatis.
                            Proin luctus faucibus fringilla tempor nisl turpis porta. Purus tellus aenean sem ultrices
                            nascetur blandit. Iaculis nibh at tempus pretium curae consequat. Morbi duis venenatis felis
                            natoque efficitur hendrerit vitae dignissim. Orci dapibus nisl lectus faucibus vitae.
                            Viverra diam nascetur convallis id feugiat ultrices vel. Fringilla aenean natoque tincidunt
                            a blandit odio habitant ridiculus. Facilisis hendrerit egestas tortor accumsan habitasse
                            dui. Class metus condimentum vestibulum placerat felis cras. Maecenas ornare ante ornare
                            aenean tellus non. Torquent erat curabitur tristique porttitor nisl. Dis torquent pharetra
                            sem nostra ligula leo nec. Platea ipsum vitae sagittis accumsan eu commodo inceptos libero.
                            Laoreet fringilla taciti dignissim magna fringilla viverra. Interdum rhoncus orci dignissim
                            molestie accumsan habitant litora amet. Primis vulputate euismod vehicula euismod aenean
                            turpis molestie. Scelerisque blandit metus pharetra venenatis; urna augue.
                        </div>
                        <Requirements data={info.requirements} />
                    </div>
                    <div className="px-5 w-80 h-auto flex flex-col items-center bg-blue-300">
                        <FavouritesButton cookie={cookie} id={id} setErrorMessage={setErrorMessage} />
                        <div className="h-fit w-full text-left pb-4 mt-5">
                            <h3 className="text-xl font-medium">Genre:</h3>
                            <span className="text-xl">{info.genre.name}</span>
                        </div>
                        <div className="h-fit w-full mt-5">
                            <div className="text-left h-fit">
                                <h3 className="text-xl font-medium">Publisher:</h3>
                                <span className="text-xl">{info.publisher.name}</span>
                            </div>
                            <div className="h-fit text-left">
                                Established: {new Date(info.publisher.established).toLocaleDateString()}
                            </div>
                            <div className="h-fit text-left">{info.publisher.description}</div>
                        </div>

                        <Platforms data={info.platforms} />
                    </div>
                </div>
            </div>
        </>
    );
}

export default GameInfo;
