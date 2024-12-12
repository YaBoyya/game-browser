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
                <div className={"flex flex-row w-full h-36 overflow-clip " + bg}>
                    <img src="https://gameranx.com/wp-content/uploads/2020/06/Fortnite.jpg" className="h-fit my-auto w-48" />
                    <div className="justify-between flex w-full">
                        <div className="flex flex-col flex-shrink-0 my-auto">
                            <div className="ml-4 m-2 text-white font-semibold text-3xl">{game.title}</div>
                            <div className="ml-4 mt-1 mx-2 text-gray-100 font-medium text-xl">
                                {game.publisher.name}
                            </div>
                            <div className="ml-4 mt-1 mx-2 text-gray-200 text-base">{game.genre.name}</div>
                        </div>
                        <div className="flex flex-col">
                            <span className="my-auto text-white ">{game.description}</span>
                        </div>
                        <div className="flex flex-col justify-around">
                            <div className="text-xl text-white mt-3">
                                Platforms:
                                {game.platforms.map((x, i) => (
                                    <div key={i} className="mr-4 text-base text-right text-white">
                                        {x.platform.name}
                                    </div>
                                ))}
                            </div>
                            <div className="text-lg text-white mr-4 mb-3">
                                Released: {new Date(game.release_date).toLocaleDateString()}
                            </div>
                        </div>
                    </div>
                </div>
            </Link>
    );
}

export default GameList;
