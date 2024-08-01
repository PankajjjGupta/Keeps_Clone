import React from "react";
import { DisplayKeeps } from "./DisplayKeeps";

export function DisplayAllKeeps({keeps}) {
    const notify = (msg) => {
        toast.error(msg, {
            position: "top-right"
        });
    }
    return (
        <div className="w-4/5 grid grid-cols sm:grid-cols-2 md:grid-cols-4 gap-2 mx-auto">
            {keeps.map(keep => <DisplayKeeps key={keep.id} keep={keep}/>)}
        </div>
    )
}