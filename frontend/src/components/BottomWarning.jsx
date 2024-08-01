import React from "react";
import { Link } from "react-router-dom";

export function BottomWarning({label, to, text}) {
    return (
        <div className="flex items-center justify-center">
            <h1 className="font-semibold mr-2">{label}</h1>
            <Link className="underline underline-offset-3 text-blue-500" to={to}>{text}</Link>
        </div>
    )
}