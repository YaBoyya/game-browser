import {useState, useEffect} from "react";
import ErrorMessage from "../components/ErrorMessage";
import {useCookies} from "react-cookie";
import {
  COOKIE_TOKEN_NAME,
  GAMESURL,
  PUBLISHERSURL,
  PLATFORMSURL,
  GENRESURL,
  GAMESFILTERURL
} from "../constants";

function Games() {
  const test_data = [
    {
      title: "title",
      description: "desc",
      release_date: "release_date",
      genre_id: 0,
      genre: "genre",
      publisher_id: 0,
      publisher: "publisher",
      platforms: [{
        platform_id: 0,
        platform: "platform",
        release_date: "platform_date",
      }],
      requirements_id: 0
    }
  ];
  const [games, setGames] = useState(test_data);
  const [publishers, setPublishers] = useState([]);
  const [genres, setGenres] = useState([]);
  const [platforms, setPlatforms] = useState([]);
  const [errorMessage, setErrorMessage] = useState<string>("");
  const getData = (url, setfn) => {
    return async () => {
      try {
        const controller = new AbortController();
        const timeout = setTimeout(() => controller.abort(), 5000);
        const response = await fetch(url, {
          method: "GET",
          signal: controller.signal
        });
        clearTimeout(timeout);

        const json = await response.json();
        setfn(json);
      } catch (error: any) {
        if (error.name === "AbortError") {
          setErrorMessage("Connection time out");
        } else {
          setErrorMessage(error.message);
        }
        setfn([]);
      }
    };
  }
  useEffect(() => {
    getData(GAMESURL, setGames)();
    getData(PUBLISHERSURL, setPublishers)();
    getData(PLATFORMSURL, setPlatforms)();
    getData(GENRESURL, setGenres)();
  }, []);
  return (
    <div className="w-full min-h-screen">
      <ErrorMessage msg={errorMessage} />
      <div className="flex flex-row">
        <GameList games={games} platforms={platforms} publishers={publishers} genres={genres}/>
        <GameFilter setGames={setGames} setErrorMessage={setErrorMessage}/>
      </div>
    </div>
  );
}

function GameList({games, publishers, genres, platforms}) {
  const even_color = "bg-blue-400";
  const odd_color = "bg-blue-500";
  return (
    <div className="w-3/4">
    {
      games.map((x, i) =>
                <Game key={i}
                game={x}
                publishers={publishers}
                platforms={platforms}
                genres={genres}
                bg={i % 2 == 0 ? even_color : odd_color} />)
    }
    </div>
  );
}

function Fields({data, handleInput}) {
  return Object.keys(data).map((key: string, index) => (
        <div className="flex flex-row items-center mb-3 justify-between">
          <label className="text-white mr-3"
                 htmlFor={key}>
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
    year: new Date().getFullYear(),
  };
  const [filters, setFilters] = useState(filterParams)
  const handleInput = (value, key) => {
    setFilters({
      ...filters,
      [key]: value,
    });
  };
  const removeEmpty = (obj) => {
    return Object.entries(obj)
    .filter((entry) => entry[1] !== "")
    .reduce((prev, entry) => ({...prev, [entry[0]]: entry[1]}),{});
  };
  const onSubmit = async () => {
    event.preventDefault();
    try {
      const controller = new AbortController();
      const timeout = setTimeout(() => controller.abort(), 5000);
      const response = await fetch(GAMESFILTERURL + "?" +
                                   new URLSearchParams(removeEmpty(filters)), {
        method: "GET",
        signal: controller.signal
      });
      clearTimeout(timeout);
      if(response.status == 404) {
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
      <form onSubmit={onSubmit}
            className="bg-blue-500 h-fit w-fit p-6 m-3 flex flex-col">
        <Fields data={filters} handleInput={handleInput}/>
        <button className="text-white w-32 p-2 bg-blue-400 mt-3 self-end">Search</button>
      </form>
    </div>
  );
}

function Game({game, publishers, genres, platforms, bg}) {
  const retrieve = (list, id) => {
    const obj = list.find((x) => x._id == id);
    if(typeof obj === "undefined") return "";
    return obj.name;
  }
  return (
    <div className={"flex flex-row w-full h-32 overflow-clip " + bg}>
    <img src="https://gameranx.com/wp-content/uploads/2020/06/Fortnite.jpg" className="h-full w-48" />
    <div className="justify-between flex w-full">
    <div className="content-center h-full mx-3 w-48">
    <span className="w-full h-full text-white">{game.title}</span>
    </div>
    <div className="content-center h-full mx-3 w-20 text-center">
    </div>
    <div className="content-center h-full mx-3 w-20 text-center">
    <span className="align-middle w-full h-full text-white">{retrieve(genres, game.genre_id)}</span>
    </div>
    <div className="content-center h-full mx-3 w-24 text-end">
    <span className="w-full h-full text-white">{retrieve(publishers, game.publisher_id)}</span>
    </div>
    <div className="content-center h-full mx-3 w-20 text-center flex-row">
    {game.platforms.map((x, i) => (
      <div key={i} className="w-full text-white">{retrieve(platforms, x.platform_id)}</div>
    ))}
    </div>
    <div className="content-center h-full mx-3 w-24 text-end">
    <span className="w-full h-full text-white">{new Date(game.release_date).toLocaleDateString()}</span>
    </div>
    </div>
    </div>
  );
}

export default Games;
