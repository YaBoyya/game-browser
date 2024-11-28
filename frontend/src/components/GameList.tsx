import {Link} from "react-router-dom";

function GameList({games}) {
    const even_color = "bg-blue-400";
    const odd_color = "bg-blue-500";
    return (
        <>
            {games.map((x, i) => (
                <Game key={i} game={x} bg={i % 2 == 0 ? even_color : odd_color} />
            ))}
        </>
    );
}

function Game({game, bg}) {
    return (
        <Link to={"/game/" + game._id}>
            <div className={"flex flex-row w-full h-32 overflow-clip " + bg}>
                <img src="https://gameranx.com/wp-content/uploads/2020/06/Fortnite.jpg" className="h-full w-48" />
                <div className="justify-between flex w-full">
                    <div className="content-center h-full w-20 mx-3">
                        <span className="w-full h-full text-white">{game.title}</span>
                    </div>
                    <div className="content-center h-full mx-3 w-20 text-center">
                        <span className="align-middle w-full h-full text-white">{game.genre.name}</span>
                    </div>
                    <div className="content-center h-full mx-3 w-24 text-end">
                        <span className="w-full h-full text-white">{game.publisher.name}</span>
                    </div>
                    <div className="content-center h-full mx-3 w-20 text-center flex-row">
                        {game.platforms.map((x, i) => (
                            <div key={i} className="w-full text-white">
                                {x.platform.name}
                            </div>
                        ))}
                    </div>
                    <div className="content-center h-full mx-3 w-24 text-end">
                        <span className="w-full h-full text-white">
                            {new Date(game.release_date).toLocaleDateString()}
                        </span>
                    </div>
                </div>
            </div>
        </Link>
    );
}

export default GameList;
