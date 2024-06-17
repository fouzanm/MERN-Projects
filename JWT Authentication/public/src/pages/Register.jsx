import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {ToastContainer, toast} from "react-toastify"
import axios from "axios"
import { useCookies } from "react-cookie";

const Register = () => {
    const navigate = useNavigate();
    const [cookies] = useCookies([]);
    useEffect(() => {
        if (cookies.jwt) {
            navigate('/')
        }
    }, [navigate, cookies])
    const [values, setValues] = useState({
        email: "",
        password: ""
    })

    const generateError = (err) => toast.error(err, {
        position: "bottom-right"
    })

    const handleSubmit = async (ev) => {
        ev.preventDefault();
        try {
            const {data} = await axios.post("http://localhost:4000/register", {...values}, {withCredentials: true});
            console.log("DATA", data)
            if (data?.errors) {
                const {email, password} = data.errors;
                if (email) generateError(email);
                else if (password) generateError(password);
            } else if (data) navigate('/');

        } catch(err) {
            console.log(err.message)
        }
    }

    return (
        <div className="container">
            <h2>Register Account</h2>
            <form onSubmit={(ev) => handleSubmit(ev)}>
                <div>
                    <label htmlFor="email">Email</label>
                    <input type="email" name="email" placeholder="Email" onChange={(ev) => setValues({...values, [ev.target.name]: ev.target.value})}/>
                </div>
                <div>
                    <label htmlFor="password">Password</label>
                    <input type="password" name="password" placeholder="Password" onChange={(ev) => setValues({...values, [ev.target.name]: ev.target.value})}/>
                </div>
                <button type="submit">Submit</button>
                <span>Already have an account? <Link to="/login">Login</Link></span>
            </form>
            <ToastContainer />
        </div>
    )
}

export default Register;