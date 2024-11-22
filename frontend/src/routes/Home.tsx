import {useState} from "react";

function Home() {
    const [responseData, setResponseData] = useState(null);

    fetch("http://localhost:3010/api/auth/login", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            email: "test@example.com",
            password: "123456"
        })
    })
        .then(response => response.json())
        .then(data => setResponseData(data))
        .catch(error => console.error("Error:", error));

    return (
        <div className="bg-lime-300 p-2 text-center">
            <h1>Game Browser</h1>
            {responseData && (
                <div>
                    <h2>Response Data:</h2>
                    <pre>{JSON.stringify(responseData, null, 2)}</pre>
                </div>
            )}
        </div>
    );
}

export default Home;

