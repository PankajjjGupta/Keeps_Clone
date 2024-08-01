import axios from "axios";
import { redirect } from "react-router-dom";
import { atom, selector } from "recoil";


export const keepsAtom = atom({
    key : 'keepsAtom',
    default : selector({
        key : 'keepsSelector',
        get : async ({get}) => {
            const token = window.localStorage.getItem("token");
            if(token) {
                try {
                    const response = await axios.get("http://localhost:3000/api/v1/keep/", {
                        headers : {
                            Authorization : `Bearer ${token}`
                        }
                      })
                      return response.data.keeps;
                }
                catch (error) {
                    if(error.response.status == 401) {
                        console.log("You're not authenticated!");
                        window.location.href = "/signin"
                    }
                    return []
                }
            } else {
                window.location.href = "/signin"
            }
            return []
        }
    })
})