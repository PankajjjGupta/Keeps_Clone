import React, { useEffect, useState } from "react";
import { InputBox } from "../components/InputBox";
import { BottomWarning } from "../components/BottomWarning";
import { Navbar } from "../components/Navbar";
import { useNavigate } from "react-router-dom";
import { Button } from "./Button";
import axios from "axios";
import { ToastContainer, toast } from 'react-toastify';

export function Sign() {
    const [firstname, setFirstname] = useState("");
    const [username, setUsername] = useState("");
    const [lastname, setLastname] = useState("");
    const [password, setPassword] = useState("");

    const notify = (msg) => {
        toast.error(msg, {
            position: "top-right"
        });
    }

    const navigate = useNavigate("")
    return (
        <>
            <Navbar />
        <div className="mt-10 border-gray-600 border-[.1px] bg-slate-100 p-7 rounded-lg w-4/5 md:w-3/12 mx-auto mb-10">
            <div className="mb-10 text-white font-bold text-4xl md:text-5xl text-center">
                <h1 className="text-slate-950">Signup</h1>
            </div>
            <InputBox onChange={(e) => {
                setFirstname(e.target.value);
            }} placeholder={"John"} label={"Firstname *"}/>
            <InputBox onChange={(e) => {
                setLastname(e.target.value);
            }} placeholder={"Doe"} label={"Lastname *"}/>
            <InputBox onChange={(e) => {
                setUsername(e.target.value);
            }} placeholder={"John@gmail.com"} label={"Username *"}/>
            <InputBox onChange={(e) => {
                setPassword(e.target.value);
            }} placeholder={"password"} label={"Password *"}/>
            <ToastContainer />
            <Button text={"SignUp"} onClick={async () => {
                try {
                    const response = await axios.post("http://localhost:3000/api/v1/user/signup", {
                        username,
                        password,
                        firstName: firstname,
                        lastName : lastname
                    })
                    console.log(response);
                    window.localStorage.setItem("token", response.data.token);
                    navigate("/");
                }
                catch(error) {
                    const Error = {
                        message : error.response.data.message,
                        status : error.response.status
                    }
                    console.log(Error)
                    notify(Error.message)
                }   
            }}></Button>
            <div>
                <BottomWarning label={"Already have an account"} to={"/signin"} text="Signin"/>
            </div>
        </div>
        </>
    )
}