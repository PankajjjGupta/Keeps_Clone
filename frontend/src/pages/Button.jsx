import React from "react";

export function Button({text, onClick}) {
    return (
        <> 
        <button onClick={onClick} className="bg-slate-900 text-white w-full p-3 rounded-md mb-2 font-bold">{text}</button>
        </>
    )
}