import React, { useEffect, useState, useContext } from "react";
import { Navigate } from "react-router-dom";
import { useAuthHook } from "../hooks/authHook";
import { UserMetaContext } from "../context/userContext";

export function ProtectedRoutes({ children }) {
    const [user, loading] = useAuthHook();

    if(loading) {
        return <div className="text-white">Loading...</div>
    } else {
        if (user) {
            return (
                <UserMetaContext.Provider value={user}>
                    {children}
                </UserMetaContext.Provider>
            )
        } else {
            return <Navigate to="/signin" />;
        }
    }
}

export function UnProtectedRoutes({children}) {
    const [user ,loading] = useAuthHook();
    console.log(user, loading)
    if(loading) {
        return <div className="text-white">Loading...</div>
    } else {
        if(!user) {
            return children
        } else {
            return <Navigate to="/"/>;
        }
    }
}
