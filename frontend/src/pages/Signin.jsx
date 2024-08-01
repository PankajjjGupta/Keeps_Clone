import React, { useEffect, useState } from "react";
import { InputBox } from "../components/InputBox";
import { BottomWarning } from "../components/BottomWarning";
import { Navbar } from "../components/Navbar";
import { Button } from "./Button";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useAuthHook } from "../hooks/authHook";
import { ToastContainer, toast } from "react-toastify";

export function Signin() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState(""); 
    const navigate = useNavigate();
    const logout_success = window.localStorage.getItem("logout_success");
    useEffect(() => {
        if(logout_success == "true") {
            toast.success("Bye", {
                position : "top-right"
            })
        }
        window.localStorage.clear();
    }, [])

    const notify = (msg) => {
        toast.error(msg, {
            position: "top-right"
        });
    }

    return (
        <div className="mt-10 border-gray-600 border-[.1px] bg-slate-100 p-7 rounded-lg w-4/5 md:w-3/12 mx-auto mb-10">
                    <div className="mb-10 text-white font-bold text-4xl md:text-5xl text-center">
                        <h1 className="text-slate-950">Signin</h1>
                    </div>
                    <InputBox placeholder={"John@gmail.com"} onChange={(e) => {
                        setUsername(e.target.value)
                    }} label={"Username *"}/>
                    <InputBox placeholder={"password"} onChange={(e) => {
                        setPassword(e.target.value);
                    }} label={"Password *"}/>
                    <Button text={"Signin"} onClick={async () => {
                        try {
                            const response = await axios.post("http://localhost:3000/api/v1/user/signin", {
                                username,
                                password
                            })
                            window.localStorage.setItem("token", response.data.token);
                            window.localStorage.setItem("login_success", true)
                            navigate("/")
                        } catch(error) {
                            console.log(error.response.data.message)
                            notify(error.response.data.message)
                        }
                    }}/>
                    <ToastContainer />
                    <div>
                        <BottomWarning label={"Already have an account"} to={"/signin"} text="Signup"/>
                    </div>
                </div> 
    )
}