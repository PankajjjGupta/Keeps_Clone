import React, {Suspense, useEffect, useState} from "react";
import { useRecoilState } from "recoil";
import { keepsAtom } from "../atoms";
import { AddTodoInput } from "../components/AddTodoInput";
import { RecoilRoot } from "recoil";
import { DisplayAllKeeps } from "../components/DisplayAllKeeps";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import { useAuthHook } from "../hooks/authHook";

export function Dashboard() {
    const loginSuccess = window.localStorage.getItem("login_success");
    console.log(loginSuccess)
    useEffect(() => {
      if(loginSuccess == 'true') {
        toast.success("Login Success", {
          position : 'top-right'
        })
      }
      window.localStorage.setItem("login_success", false);
    }, [])
    return (
        <>
            <ToastContainer></ToastContainer>
            <RecoilRoot>
            <Suspense fallback={<div className='text-white'>Loading ... </div>}>
              <AddTodoInput /> 
                <Main />
            </Suspense>
            </RecoilRoot> 
        </>  
    )
}

function Main () {
    const [keeps, setKeeps] = useRecoilState(keepsAtom)
    useEffect(() => {
      const token = window.localStorage.getItem("token");
      const x = setInterval(() => {
        axios.get("http://localhost:3000/api/v1/keep/", {
            headers : {
                Authorization : `Bearer ${token}`
            }
          })
            .then(response =>{
              setKeeps(response.data.keeps);
            });
      }, 10000);
      return () => {
        clearInterval(x);
      }
    }, [])
    return (
      <>
        <DisplayAllKeeps keeps={keeps} />
      </>
    )
  }