import {RenderFormProps} from "../props";

function RenderForm({data, handleInput}: RenderFormProps) {
    const stringFn = (data, key: string, index, handleInput) => {
        return (
            <div key={index} className="flex flex-col my-3">
                <label htmlFor={key}>{key[0].toUpperCase() + key.slice(1)}</label>
                <input
                    id={key}
                    className="px-3 py-2"
                    placeholder={`Your ${key}`}
                    type={["email", "password"].includes(key) ? key : "text"}
                    onChange={(event) => handleInput(event.target.value, key)}
                    value={data[key]}
                />
            </div>
        );
    };
    const objFn = (data, key: string, index, handleInput) => {
        if (isNaN(key) || isNaN(parseFloat(key))) {
            return (
                <div key={index}>
                    <label className="text-lg" htmlFor={key}>
                        {key[0].toUpperCase() + key.slice(1)}
                    </label>
                    <div className="flex flex-row mb-3 flex-wrap max-w-[800px]">
                        {Object.keys(data[key]).map((subkey: string, subindex) =>
                            stringFn(data[key], subkey, subindex, (val, subkey) => handleInput(val, {key, subkey}))
                        )}
                    </div>
                </div>
            );
        }
        return (
            <div key={index} className="flex flex-row flex-wrap max-w-[800px]">
                {Object.keys(data[key]).map((subkey: string, subindex) =>
                    stringFn(data[key], subkey, subindex, (val, subkey) => handleInput(val, {key, subkey}))
                )}
            </div>
        );
    };
    const arrFn = (data, key: string, index, handleInput) => {
        return (
            <div key={index}>
                <label className="text-lg" htmlFor={key}>
                    {key[0].toUpperCase() + key.slice(1)}
                </label>
                <div className="flex flex-col flex-wrap mb-6 max-w-[800px]">
                    {Object.keys(data[key]).map((subkey: string, subindex) =>
                        objFn(data[key], subkey, subindex, (val, subkey) =>
                            handleInput(val, {group: key, field: subkey})
                        )
                    )}
                </div>
            </div>
        );
    };
    const dispatchFn = (data, key: string, index) => {
        if (typeof data[key] === "string") {
            return stringFn(data, key, index, handleInput);
        }
        if (Array.isArray(data[key])) {
            return arrFn(data, key, index, handleInput);
        }
        return objFn(data, key, index, handleInput);
    };
    return <>{Object.keys(data).map((key: string, index) => dispatchFn(data, key, index))}</>;
}

export default RenderForm;
