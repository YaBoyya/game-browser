function ResourceTable({data}) {
    const color = {even: "bg-blue-200", odd: "bg-blue-300", header: "bg-blue-400"};
    if (data.values.length === 0) return;
    return (
        <table>
            <thead>
                <tr className={"min-h-full " + color.header}>
                    {Object.keys(data.values[0]).map((x, i) => (
                        <th key={i}>{x}</th>
                    ))}
                    <th>Action</th>
                </tr>
            </thead>
            <tbody>
                {data.values.map((x, i) => (
                    <tr className={"w-full " + (i % 2 == 0 ? color.even : color.odd)} key={i}>
                        {Object.values(x).map((y, i) => (
                            <td key={i}>
                                <div className="h-12 text-xs min-w-24 px-3 overflow-hidden text-ellipsis text-center place-content-center">
                                    {Array.isArray(y)
                                        ? y.map((z, i) => <div key={i}>{Object.values(z).length == 1 ? z : z._id}</div>)
                                        : y == null || typeof y !== "object"
                                          ? y
                                          : y._id}
                                </div>
                            </td>
                        ))}
                        <td className="h-12 text-sm min-w-24 px-3 overflow-hidden text-ellipsis text-center">
                            {data.actions.map((y, i) => (
                                <button
                                    key={i}
                                    onClick={() => y.handler(x)}
                                    className="mx-1 text-white p-1 bg-blue-500 w-fit"
                                >
                                    {y.label}
                                </button>
                            ))}
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
}

export default ResourceTable;
