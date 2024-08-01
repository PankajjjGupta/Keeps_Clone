import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import three_dot from "../assets/three_dots.png"
import { useRef } from "react";
import axios from "axios";
import { useRecoilState } from "recoil";
import { keepsAtom } from "../atoms";
import { toast, ToastContainer } from "react-toastify";

export function DisplayKeeps({keep}) {
    const navigate = useNavigate()
    const optionRef = useRef("");
    const [open, setOpen] = useState(false);
    const [keeps, setKeeps] = useRecoilState(keepsAtom);
    const [deleteId, setDeleteId] = useState(0);

    useEffect(() => {
        if(deleteId > 0) {
            const newKeeps = keeps.filter(keep => {
                if(keep.id != deleteId) {
                    return keep
                }
            })
            toast.success("Deleted Successful", {
                position : "top-right"
            })
            setKeeps(newKeeps)
        }
    }, [deleteId])

    useEffect(() => {
        document.addEventListener('mousedown', (e) => {
            if(!optionRef.current.contains(e.target)) {
                setOpen(false)
            }
        })
    }, [])
    return (
        <div className="border-gray-600 border-[.1px] bg-lsate rounded-lg w-full mx-auto ">
            <div>
                <h1 className="text-white px-4 py-4">{keep.title}</h1>
            </div>
            <div>
                <h2 className="text-white px-4 pb-8">{keep.text}</h2>
            </div>
            <div ref={optionRef}  className="relative pb-3 w-5 ml-auto"> 
                <img onClick={() => {
                    setOpen(true)
                }} 
                className="invert cursor-pointer w-5" src={three_dot} alt="" />
                <div className={`${open ? "" : "hidden"} cursor-pointer absolute left-1 mt-2 z-30 bg-gray-900 border-gray-500 border-[.1px] text-white w-[150px] p-2`}>
                 <button onClick={async () => {
                    const token = window.localStorage.getItem("token")
                    try {
                        const response = await axios.delete("http://localhost:3000/api/v1/keep/", {
                            headers : {
                                Authorization : `Bearer ${token}`
                            },
                            data : {
                                id : keep.id
                            }
                        })
                        setDeleteId(keep.id)
                    } catch (error) {
                        navigate("/signin")
                    }
                    
                 }} className="text-sm">Delete Note</button>
                </div>
            </div>
        </div>
    )
}