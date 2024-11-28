import {useState, useEffect} from "react";
import ErrorMessage from "../components/ErrorMessage";
import GameList from "../components/GameList";
import {useCookies} from "react-cookie";
import {COOKIE_TOKEN_NAME, GAMESURL, PUBLISHERSURL, PLATFORMSURL, GENRESURL, GAMESFILTERURL} from "../constants";

function Games() {
    const [games, setGames] = useState([]);
    const [errorMessage, setErrorMessage] = useState<string>("");
    const getGames = async () => {
        try {
            const controller = new AbortController();
            const timeout = setTimeout(() => controller.abort(), 5000);
            const response = await fetch(GAMESURL, {
                method: "GET",
                signal: controller.signal
            });
            clearTimeout(timeout);

            const json = await response.json();
            setGames(json);
        } catch (error: any) {
            if (error.name === "AbortError") {
                setErrorMessage("Connection time out");
            } else {
                setErrorMessage(error.message);
            }
            setGames([]);
        }
    };
    useEffect(() => {
        getGames();
    }, []);
    return (
        <div className="w-full min-h-screen">
            <ErrorMessage msg={errorMessage} />
            <div className="flex flex-row">
                <div className="w-3/4">
                    <GameList games={games} />
                </div>
                <GameFilter setGames={setGames} setErrorMessage={setErrorMessage} />
            </div>
        </div>
    );
}

function Fields({data, handleInput}) {
    return Object.keys(data).map((key: string, index) => (
        <div key={key} className="flex flex-row items-center mb-3 justify-between">
            <label className="text-white mr-3" htmlFor={key}>
                {key[0].toUpperCase() + key.slice(1) + ":"}
            </label>
            <input
                id={key}
                className="px-3 py-2"
                placeholder={key[0].toUpperCase() + key.slice(1)}
                type={key.toLowerCase().includes("year") ? "number" : "text"}
                onChange={(event) => handleInput(event.target.value, key)}
                value={data[key]}
            />
        </div>
    ));
}

function GameFilter({setGames, setErrorMessage}) {
    const filterParams = {
        title: "",
        genre: "",
        publisher: "",
        year: new Date().getFullYear()
    };
    const [filters, setFilters] = useState(filterParams);
    const handleInput = (value, key) => {
        setFilters({
            ...filters,
            [key]: value
        });
    };
    const removeEmpty = (obj) => {
        return Object.entries(obj)
            .filter((entry) => entry[1] !== "")
            .reduce((prev, entry) => ({...prev, [entry[0]]: entry[1]}), {});
    };
    const onSubmit = async () => {
        event.preventDefault();
        try {
            const controller = new AbortController();
            const timeout = setTimeout(() => controller.abort(), 5000);
            const response = await fetch(GAMESFILTERURL + "?" + new URLSearchParams(removeEmpty(filters)), {
                method: "GET",
                signal: controller.signal
            });
            clearTimeout(timeout);
            if (response.status == 404) {
                setGames([]);
                return;
            }

            const json = await response.json();
            setGames(json);
        } catch (error: any) {
            if (error.name === "AbortError") {
                setErrorMessage("Connection time out");
            } else {
                setErrorMessage(error.message);
            }
            setGames([]);
        }
    };
    return (
        <div className="flex-grow flex justify-center items-center">
            <form onSubmit={onSubmit} className="bg-blue-500 h-fit w-fit p-6 m-3 flex flex-col">
                <Fields data={filters} handleInput={handleInput} />
                <button className="text-white w-32 p-2 bg-blue-400 mt-3 self-end">Search</button>
            </form>
        </div>
    );
}

export default Games;
