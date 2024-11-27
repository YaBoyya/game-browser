import GameList from "../components/GameList";
function Home() {
    return (
        <>
            <div className="bg-lime-300 p-2 text-center">
                <h1>Game Browser</h1>
            </div>
            <div className="w-3/4">
              <GameList />
            </div>
        </>
    );
}

export default Home;
