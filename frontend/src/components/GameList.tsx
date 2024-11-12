export default function GameList() {
    const even_color = "bg-emerald-900";
    const odd_color = "bg-emerald-950";
    const test_data = [
        {
            title: "Tetris",
            description: "Tetris description",
            release_date: "1999-10-02",
            genre_id: 0,
            genre: "Arcade",
            publisher_id: 0,
            publisher: "Nintendo",
            image: "https://i0.wp.com/retropond.com/wp-content/uploads/2021/03/Tetris-Featured.jpg",
            platforms: [
                {
                    platform_id: 0,
                    platform: "SNES",
                    release_date: "date"
                }
            ]
        },
        {
            title: "League of Legends",
            description: "LOL",
            release_date: "2010-01-23",
            genre_id: 1,
            genre: "MOBA",
            publisher_id: 1,
            publisher: "Riot Games",
            image: "https://static.invenglobal.com/upload/image/2019/09/17/i1568742297124374.jpeg",
            platforms: [
                {
                    platform_id: 1,
                    platform: "Windows",
                    release_date: "date"
                }
            ]
        },
        {
            title: "Rocket League",
            description: "Broooom",
            release_date: "2014-06-10",
            genre_id: 2,
            genre: "Racing",
            publisher_id: 21,
            publisher: "Riot Games",
            image: "https://logos-world.net/wp-content/uploads/2020/11/Rocket-League-Logo.png",
            platforms: [
                {
                    platform_id: 1,
                    platform: "Windows",
                    release_date: "date"
                },
                {
                    platform_id: 2,
                    platform: "Linux",
                    release_date: "date"
                }
            ]
        }
    ];
    const html_data = test_data.map((x, i) => <Game data={x} bg={i % 2 == 0 ? even_color : odd_color} />);
    return <div className="w-full">{html_data}</div>;
}

function Game({data, bg}) {
    return (
        <div className={"flex flex-row w-full h-32 " + bg}>
            <img src={data.image} className="h-full w-48" />
            <div className="justify-between flex w-full">
                <div className="content-center h-full mx-3 w-48">
                    <span className="w-full h-full text-white">{data.title}</span>
                </div>
                <div className="content-center h-full mx-3 w-20 text-center">
                    <span className="align-middle w-full h-full text-white">{data.genre}</span>
                </div>
                <div className="content-center h-full mx-3 w-20 text-center">
                    <span className="align-middle w-full h-full text-white">{data.publisher}</span>
                </div>
                <div className="content-center h-full mx-3 w-24 text-end">
                    <span className="w-full h-full text-white">{data.release_date}</span>
                </div>
                <div className="content-center h-full mx-3 w-20 text-center flex-row">
                    {data.platforms.map((x) => (
                        <div className="w-full text-white">{x.platform}</div>
                    ))}
                </div>
                <div className="content-center h-full mx-3 w-24 text-end">
                    <span className="w-full h-full text-white">{data.release_date}</span>
                </div>
            </div>
        </div>
    );
}
