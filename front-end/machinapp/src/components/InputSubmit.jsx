import React from "react";

const InputSubmit = (props) => {
    let valorInput = props.value

    return (
        <>
            <input type="submit" value={valorInput}
                   className="bg-green-400 hover:bg-green-700 transition-colors cursor-pointer uppercase font-bold w-full p-3 text-white rounded-lg"/>
        </>
    )
}

export default InputSubmit