// TODO type it
function RenderForm({data, handleInput}: any) {
  return (
    <>
      {Object.keys(data).map((key, index) => (
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
      ))}
    </>
  );
} 

export default RenderForm;