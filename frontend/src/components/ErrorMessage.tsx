function ErrorMessage({msg}: any) { 
  return msg 
    ? (
      <div className="w-full text-red-950 p-3 bg-red-300 border-2 border-red-600">
        {msg }
      </div>
  ) : null;
}

export default ErrorMessage;