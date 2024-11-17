// TODO type it
function RenderForm({data, handleInput}: any) {
  return (
    <>
      {Object.keys(data).map((key, index) => (
        <div className="flex flex-col my-3">
          <label htmlFor={key}>{key[0].toUpperCase() + key.slice(1)}</label>
          <input
            key={index}
            id={key}
            className="px-3 py-2"
            placeholder={`Your ${key[0].toUpperCase() + key.slice(1)}`}
            onChange={(event) => handleInput(event.target.value, key)}
          />
        </div>
      ))}
    </>
  );
} 

export default RenderForm;