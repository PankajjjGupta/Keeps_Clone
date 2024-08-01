import { useEffect, useState } from "react";
import axios from "axios";

export function useAuthHook() {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true)
    const token = window.localStorage.getItem("token");

    useEffect(() => {
        if (token) {
            axios.get("http://localhost:3000/api/v1/user/getuser", {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
                .then(async response => {
                    await new Promise(resolve => setTimeout(resolve, 1000))
                    setUser(response.data.user);
                    setLoading(false)
                })
                .catch(error => {
                    setUser(null);
                    setLoading(false)
                });
        } else {
            setUser(null);
            setLoading(false)
        }
    }, [token]);

    return [user, loading];
}
