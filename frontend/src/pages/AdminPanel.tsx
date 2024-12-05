import {GAMESURL, GENRESURL, PUBLISHERSURL, PLATFORMSURL, USERSURL, COOKIE_TOKEN_NAME} from "../constants";
import ResourceTable from "../components/ResourceTable";
import {useState, useEffect, useRef} from "react";
import {useNavigate} from "react-router-dom";
import {useCookies} from "react-cookie";

const Choice = {
    GAMES: 0,
    GENRES: 1,
    PUBLISHERS: 2,
    PLATFORMS: 3,
    USERS: 4
};

function Button({data}) {
    const navigate = useNavigate();
    if (data.choice === Choice.GAMES)
        return (
            <button className="text-white p-3 m-3 bg-blue-400 w-fit" onClick={() => navigate("/create")}>
                New Game
            </button>
        );
    if (data.choice === Choice.GENRES)
        return (
            <button className="text-white p-3 m-3 bg-blue-400 w-fit" onClick={() => navigate("/create")}>
                New Genre
            </button>
        );
    if (data.choice === Choice.PUBLISHERS)
        return (
            <button className="text-white p-3 m-3 bg-blue-400 w-fit" onClick={() => navigate("/create")}>
                New Publisher
            </button>
        );
    if (data.choice === Choice.PLATFORMS)
        return (
            <button className="text-white p-3 m-3 bg-blue-400 w-fit" onClick={() => navigate("/create")}>
                New Platform
            </button>
        );
}

function AdminPanel() {
    const [cookie] = useCookies([COOKIE_TOKEN_NAME]);
    const [errorMessage, setErrorMessage] = useState<string>("");
    const [data, setData] = useState({values: []});
    const latestData = useRef(data);
    const deleter = (url, id) => async () => {
        try {
            const controller = new AbortController();
            const timeout = setTimeout(() => controller.abort(), 5000);
            const response = await fetch(url, {
                method: "DELETE",
                headers: {
                    Authorization: "Bearer " + cookie.AUTH_TOKEN
                },
                signal: controller.signal
            });
            clearTimeout(timeout);
            if (!response.ok) throw new Error("Delete error");
            console.log(latestData);
            const values = latestData.current.values.filter((x) => x._id !== id);
            console.log(values);
            latestData.current = {...latestData.current, values};
            setData(latestData.current);
        } catch (error: any) {
            if (error.name === "AbortError") {
                setErrorMessage("Connection time out");
            } else {
                setErrorMessage(error.message);
            }
        }
    };
    const fetcher = (url) => async () => {
        try {
            const controller = new AbortController();
            const timeout = setTimeout(() => controller.abort(), 5000);
            const response = await fetch(url, {
                method: "GET",
                headers: {
                    Authorization: "Bearer " + cookie.AUTH_TOKEN
                },
                signal: controller.signal
            });
            clearTimeout(timeout);
            const json = await response.json();
            latestData.current = {...latestData.current, values: json};
            setData(latestData.current);
        } catch (error: any) {
            if (error.name === "AbortError") {
                setErrorMessage("Connection time out");
            } else {
                setErrorMessage(error.message);
            }
            latestData.current = {...latestData.current, values: []};
            setData(latestData.current);
        }
    };
    const fetchData = () => {
        switch (data.choice) {
            case Choice.GAMES:
                fetcher(GAMESURL)();
                break;
            case Choice.GENRES:
                fetcher(GENRESURL)();
                break;
            case Choice.PUBLISHERS:
                fetcher(PUBLISHERSURL)();
                break;
            case Choice.PLATFORMS:
                fetcher(PLATFORMSURL)();
                break;
            case Choice.USERS:
                fetcher(USERSURL)();
                break;
        }
    };
    const changeData = (choice) => {
        if (choice === data.choice) return;
        switch (choice) {
            case Choice.GAMES:
                latestData.current = {
                    choice,
                    values: [],
                    actions: [
                        {
                            label: "Delete",
                            handler: (x) => {
                                deleter(GAMESURL + "/" + x._id, x._id)();
                            }
                        }
                    ]
                };
                break;
            case Choice.GENRES:
                latestData.current = {
                    choice,
                    values: [],
                    actions: [
                        {
                            label: "Delete",
                            handler: (x) => {
                                deleter(GENRESURL + "/" + x._id, x._id)();
                            }
                        }
                    ]
                };
                break;
            case Choice.PUBLISHERS:
                latestData.current = {
                    choice,
                    values: [],
                    actions: [
                        {
                            label: "Delete",
                            handler: (x) => {
                                deleter(PUBLISHERSURL + "/" + x._id, x._id)();
                            }
                        }
                    ]
                };
                break;
            case Choice.PLATFORMS:
                latestData.current = {
                    choice,
                    values: [],
                    actions: [
                        {
                            label: "Delete",
                            handler: (x) => {
                                deleter(PLATFORMSURL + "/" + x._id, x._id)();
                            }
                        }
                    ]
                };
                break;
            case Choice.USERS:
                latestData.current = {
                    choice,
                    values: [],
                    actions: [
                        {
                            label: "Delete",
                            handler: (x) => {
                                deleter(USERSURL + "/" + x._id, x._id)();
                            }
                        },
                        {label: "Ban", handler: (x) => {}},
                        {label: "UnBan", handler: (x) => {}},
                        {label: "Admin", handler: (x) => {}},
                        {label: "UnAdmin", handler: (x) => {}}
                    ]
                };
                break;
        }
        setData(latestData.current);
    };
    useEffect(() => {
        changeData(Choice.GAMES);
    }, []);
    useEffect(() => {
        fetchData();
    }, [data.choice]);
    return (
        <>
            <div className="w-full">
                <button className="text-white p-3 m-3 bg-blue-400" onClick={() => changeData(Choice.GAMES)}>
                    Games
                </button>
                <button className="text-white p-3 m-3 bg-blue-400" onClick={() => changeData(Choice.GENRES)}>
                    Genres
                </button>
                <button className="text-white p-3 m-3 bg-blue-400" onClick={() => changeData(Choice.PUBLISHERS)}>
                    Publishers
                </button>
                <button className="text-white p-3 m-3 bg-blue-400" onClick={() => changeData(Choice.PLATFORMS)}>
                    Platforms
                </button>
                <button className="text-white p-3 m-3 bg-blue-400" onClick={() => changeData(Choice.USERS)}>
                    Users
                </button>
            </div>
            <div className="flex flex-col flex-grow w-full place-content-start">
                <Button data={data} />
                <ResourceTable data={data} />
            </div>
        </>
    );
}

export default AdminPanel;
