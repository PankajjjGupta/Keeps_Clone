import React, { useEffect, useState } from "react";
import KeepLogo from "../assets/keep_logo.png"
import { Link } from "react-router-dom";
import { useAuthHook } from "../hooks/authHook";
import { ToastContainer, toast } from 'react-toastify';


export function Navbar ({}) {
    const [user, loading] = useAuthHook();

    const notify = (msg) => {
        toast.error(msg, {
            position: "top-right"
        });
    }
    return (
        <div className="flex justify-between bg-slate-950 py-3 px-6 border-neutral-700 border-b-[.1px]">
            <div >
                <Link className="flex items-center" to="/">
                    <img className="w-[38px] mr-2" src={KeepLogo} alt="" />
                    <h1 className="text-white text-lg md:text-xl font-semibold">Keeps</h1>
                </Link>
            </div>
            {loading ? <div className="text-white">Loading...</div> : 
                <div className="flex items-center">
                {user ? <>
                    <div className="flex items-center justify-center h-10 w-10 rounded-full bg-gray-400 text-md md:text-xl font-semibold">{user.username[0]}</div>
                    <h2 className="text-white mx-3 font-semibold">{user.username}</h2>
                    <Link className="text-white ml-3" onClick={() => {
                        notify("Logging out");
                        window.localStorage.clear();
                        window.localStorage.setItem("logout_success", true);
                    }} to="/signin">Logout </Link>
                    <ToastContainer />
                </> : 
                    <>
                        <Link className="text-white mr-3" to="/signup" >Signup</Link>
                        <Link className="text-white" to="/signin" >Signin</Link>
                    </>
                }
            </div>
            }
        </div>
    )
}