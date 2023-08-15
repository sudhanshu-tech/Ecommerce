import React, { useState, useContext } from 'react'
import './signup.css'
import { NavLink, useNavigate } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Logincontext } from '../context/Contextprovider';


export const Sign_in = () => {

    const [logdata, setData] = useState({
        email: '',
        password: ''
    });
    // console.log(logdata)

    const history = useNavigate("")


    const { account, setAccount } = useContext(Logincontext);



    const adddata = (e) => {
        const { name, value } = e.target;

        setData(() => {
            return {
                ...logdata,
                [name]: value
            }
        })
    }

    const sendData = async (e) => {

        e.preventDefault();

        const { email, password } = logdata;

        const res = await fetch("login", {

            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                email, password
            })
        });

        const data = await res.json();
        // console.log(data);

        if (res.status === 400 || !data) {
            // console.log("invalid details");
            toast.warning("invalid details", {
                position: "top-center"
            })
        } else {
            // console.log("data valid")
            toast.success("Login successful", {
                position: "top-center"
            })
            setAccount(data)
            setData({ ...logdata, email: "", password: "" })
            history("/")
        }
    }

    const handleKeyDown = (event) => {
        if (event.key === 'Enter') {
            sendData();
        }
    }

    return (
        <>
            <section>
                <div className="sign_container">
                    <div className="sign_header">
                        <h2 className='signlogo' id='signin_logo'>Online <span className='logo2'>Shoping</span></h2>
                    </div>
                    <div className="sign_form">
                        <form method='POST'>
                            <h1>Sign-In</h1>
                            <div className="form_data">
                                <label htmlFor="email">Email</label>
                                <input type="text" name="email" id="email"
                                    onChange={adddata}
                                    value={logdata.email} />
                            </div>
                            <div className="form_data">
                                <label htmlFor="password">Password</label>
                                <input type="password" name="password" placeholder='Atleast 6 charachter...' id="password"
                                    onChange={adddata}
                                    value={logdata.password}
                                />
                            </div>
                            <button className='signin_btn' onClick={sendData} onKeyDown={handleKeyDown}>Login</button>
                        </form>
                    </div>
                    <div className="create_accountinfo">
                        <p>New To Online Shop</p>
                        <NavLink to='/register'><button>Create New Account</button></NavLink>
                    </div>
                </div>
                <ToastContainer />
            </section>
        </>
    )
}
