import React from "react";

export function InputBox({placeholder, label, onChange}) {
    return (
        <div className="my-3">
            <label className="font-semibold">{label}</label> <br />
            <input onChange={onChange} className="outline-none border-gray-600 border-[.1px] bg-transparent p-2 my-2 w-full rounded-md" type="text" placeholder={placeholder} />
        </div>
    )
}