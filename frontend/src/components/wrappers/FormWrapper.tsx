// TODO type it
function FormWrapper({children, label=null}: any) {
  return (
    <div className="flex flex-col w-[400px] min-h-[400px] p-5">
      {label ? <h1 className="text-center text-gray-900 mt-2 mb-7 font-bold">{label}</h1> : null}
      {children}
    </div>
  );
}

export default FormWrapper;