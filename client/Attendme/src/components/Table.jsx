const Table = ({
    headers = [],
    data = [],
    keys = [],
    isarray = false
}) => {
    return (
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg w-[96%] mx-2 bg-gray-900">
            <table className="w-full pr-2 text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                    <tr>
                        {headers.map((header, index) => {
                            return (
                                <th key={index} scope="col" className="px-6 py-3">
                                    {header}
                                </th>
                            )
                        })}
                    </tr>
                </thead>
                <tbody>
                    {data.map((item, index) => {
                        return (
                            <tr key={index} className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700 px-6 py-4 font-medium text-gray-900 whitespace-nowrap overflow-auto dark:text-white">
                                {keys.map((key, keyIndex) => {
                                    return (
                                        <td scope="row" key={keyIndex} className="px-4 py-4 text-center">
                                            {item[key]}
                                        </td>
                                    )
                                })}
                            </tr>
                        )
                    })}
                </tbody>
            </table> 
        </div>
    )
}

export default Table
