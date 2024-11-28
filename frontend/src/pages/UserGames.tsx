import {useState, useEffect} from "react";
import {USERGAMESURL, COOKIE_TOKEN_NAME} from "../constants";
import {useCookies} from "react-cookie";
import GameList from "../components/GameList";
import ErrorMessage from "../components/ErrorMessage";

function UserGames() {
    const [games, setGames] = useState([]);
    const [errorMessage, setErrorMessage] = useState<string>("");
    const [cookie] = useCookies([COOKIE_TOKEN_NAME]);
    const getGames = async () => {
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
    });
    return (
        <div className="w-full min-h-screen">
            <ErrorMessage msg={errorMessage} />
            <GameList games={games.map((x) => x.game)} />
        </div>
    );
}

export default UserGames;
