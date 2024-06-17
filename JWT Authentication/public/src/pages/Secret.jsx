import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import {useCookies} from "react-cookie";
import axios from "axios";

const Secret = () => {
    const navigate = useNavigate();
    const [cookies, setCookie, removeCookie] = useCookies([]);
    useEffect(() => {
        const verifyUser = async () => {
            console.log("USE EFFECT", cookies)
            if (!cookies.jwt) {
                navigate('/login')
            } else {
                const {data} = await axios.post("http://localhost:4000", {}, {withCredentials: true});
                console.log("Here", data.status)
                if (!data.status) {
                    removeCookie("jwt");
                    navigate("/login");
                } else toast(`Hi ${data.user}`, {theme:"dark"});
            }
        }
        verifyUser();
    }, [cookies, navigate, removeCookie])
    const handlelogout = () => {
        removeCookie("jwt")
        navigate('/login')
    }
    return (
        <>
            <ToastContainer />
            <div className="private">
                <h1>Super Secret Page</h1>
                <button onClick={handlelogout}>Log Out</button>
            </div>
        </>
    )
}

export default Secret;