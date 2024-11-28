import FormWrapper from "../components/wrappers/FormWrapper";
import RenderForm from "../components/RenderForm";
import {useState} from "react";
import {useNavigate} from "react-router-dom";
import ErrorMessage from "../components/ErrorMessage";
import {COOKIE_TOKEN_NAME, GAMESURL} from "../constants";
import {useCookies} from "react-cookie";

function GameCreate() {
    const dataParams = {
        game: {
            title: "",
            description: "",
            release_date: ""
        },
        genre: {
            name: ""
        },
        platform: [
            {
                name: "",
                description: "",
                release_date: ""
            }
        ],
        publisher: {
            name: "",
            established: "",
            description: ""
        },
        requirements: {
            min_cpu: "",
            min_ram: "",
            min_gpu: "",
            min_storage: "",
            rec_cpu: "",
            rec_ram: "",
            rec_gpu: "",
            rec_storage: ""
        }
    };
    const [data, setData] = useState(dataParams);
    const [errorMessage, setErrorMessage] = useState<string>("");
    const [cookie] = useCookies([COOKIE_TOKEN_NAME]);
    const navigate = useNavigate();
    const isEmptyObject = (x) => Object.values(x).filter((x) => x != "").length == 0;
    const emptyObject = (x) => Object.entries(x).reduce((prev, y) => ({...prev, [y[0]]: ""}), {});

    const handleDataChange = (value: string, key) => {
        if (typeof key.group != "undefined") {
            const changedData = {
                ...data,
                [key.group]: [
                    ...data[key.group].slice(0, +key.field.key),
                    {
                        ...data[key.group][key.field.key],
                        [key.field.subkey]: value
                    },
                    ...data[key.group].slice(+key.field.key + 1)
                ]
            };
            const filteredData = {
                ...changedData,
                [key.group]: [
                    ...changedData[key.group].filter((x) => !isEmptyObject(x)),
                    emptyObject(changedData[key.group][0])
                ]
            };
            setData(filteredData);
            return;
        }
        const newData = {
            ...data,
            [key.key]: {
                ...data[key.key],
                [key.subkey]: value
            }
        };
        setData(newData);
        return;
    };
    const renameKeys = (obj, newKeys) => {
        const keyValues = Object.keys(obj).map((key) => {
            const newKey = newKeys[key] || key;
            return {[newKey]: obj[key]};
        });
        return Object.assign({}, ...keyValues);
    };

    const onSubmit = async (event: FormEvent) => {
        event.preventDefault();
        try {
            const controller = new AbortController();
            const timeout = setTimeout(() => controller.abort(), 5000);
            const response = await fetch(GAMESURL, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: "Bearer " + cookie.AUTH_TOKEN
                },
                body: JSON.stringify(
                    renameKeys(
                        {...data, platform: data.platform.filter((x) => !isEmptyObject(x))},
                        {
                            game: "gameData",
                            genre: "genreData",
                            platform: "platformData",
                            publisher: "publisherData",
                            requirements: "requirementsData"
                        }
                    )
                ),
                signal: controller.signal
            });

            clearTimeout(timeout);

            const json = await response.json();
            if (!response.ok) {
                throw new Error(json.message);
            }
            console.log(json);
            navigate("/");
        } catch (error: any) {
            if (error.name == "AbortError") {
                setErrorMessage("Connection time out");
            } else {
                setErrorMessage(error.message);
            }
            setData(dataParams);
        }
    };
    return (
        <FormWrapper label="Create Game">
            <ErrorMessage msg={errorMessage} />
            <form onSubmit={onSubmit}>
                <RenderForm data={data} handleInput={handleDataChange} />
                <button className="text-white w-full p-3 bg-blue-400">Create</button>
            </form>
        </FormWrapper>
    );
}

export default GameCreate;
