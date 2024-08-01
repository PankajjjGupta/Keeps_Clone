import axios from "axios";
import React, { useRef, useEffect, useState } from "react";
import { useRecoilState, useSetRecoilState } from "recoil";
import { keepsAtom } from "../atoms";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

function useToggler(titleRef, noteRef, containerRef, buttonDivRef, title, text, keeps, setKeeps, setTitle, setText) {  
    const navigate = useNavigate();
    useEffect(() => {
      const titleInput = titleRef.current;
      const noteInput = noteRef.current;
      const container = containerRef.current;
      const buttonDiv = buttonDivRef.current;

      const handleFocus = () => {
        titleInput.classList.remove('hidden');
        buttonDiv.classList.remove('hidden');
      };
  
      const handleBlur = (event) => {
        if (!container.contains(event.relatedTarget)) {
          titleInput.classList.add('hidden');
          buttonDiv.classList.add('hidden');
        }
      };
  
      const handleClickOutside = async (event) => {
        if (container && !container.contains(event.target)) {
          const token = window.localStorage.getItem("token");
          titleInput.value = ""
          noteInput.value = ""
          if(title != "" || text != "") {
            try {
              const response = await axios.post("http://localhost:3000/api/v1/keep/create", {
                title,
                text 
              }, {
                headers : {
                  Authorization : `Bearer ${token}`
                }
              })
              setKeeps(keep => [...keep, {
                title,
                text
              }])
              toast.success("Keep Added", {
                position : "top-right"
              })
              setTitle(text => text = "")
              setText(text => text = "")
            } catch (error) {
              navigate("/signin")
            }
          }
          titleInput.classList.add('hidden');
          buttonDiv.classList.add('hidden');
        }
      };
  
      noteInput.addEventListener('focus', handleFocus);
      noteInput.addEventListener('blur', handleBlur);
      document.addEventListener('mousedown', handleClickOutside);
  
      return () => {
        noteInput.removeEventListener('focus', handleFocus);
        noteInput.removeEventListener('blur', handleBlur);
        document.removeEventListener('mousedown', handleClickOutside);
      };
    }, [keeps, title, text]);
}

export function AddTodoInput() {
    const [title, setTitle] = useState("");
    const [text, setText] = useState("");
    const [keeps, setKeeps] = useRecoilState(keepsAtom)
    const titleRef = useRef(null);
    const noteRef = useRef(null);
    const containerRef = useRef(null);
    const buttonDivRef = useRef(null);

    useToggler(titleRef, noteRef, containerRef, buttonDivRef, title, text, keeps, setKeeps, setTitle, setText);

    return (
        <div ref={containerRef} className="w-4/5 md-w-1/2 my-4 mx-auto border-gray-600 border-[.1px] text-white rounded-lg shadow-xl">

            <input ref={titleRef}
            onChange={(e) => {
                setTitle((e.target.value).trim())
            }}
            className="hidden px-4 py-3 text-md placeholder:text-lg w-full placeholder:text-slate-200 outline-none bg-transparent" type="text" placeholder="Title"/>

            <input ref={noteRef}
            onChange={(e) => {
                setText((e.target.value).trim())
            }}
            className="px-4 pt-3 pb-4 text-sm placeholder:text-sm w-full placeholder:text-slate-200 outline-none bg-transparent" type="text" placeholder="Take a note..."/>

            <div ref={buttonDivRef} className="hidden pb-2">
                <div className="flex justify-end">
                    <button className="px-2 text-gray-500 text-md mx-2">
                        Close
                    </button>
                </div>
            </div>
        </div>
    )
}