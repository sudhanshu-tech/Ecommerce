import React, { useState } from 'react'
import './signup.css'
import { NavLink, useNavigate } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const SignUp = () => {

    const [udata, setUdata] = useState({
        fname: '',
        email: '',
        mobile: '',
        password: '',
        cpassword: ''
    })

    const history = useNavigate("")

    // console.log(udata)

    const adddata = (e) => {
        const { name, value } = e.target;

        setUdata(() => {
            return {
                ...udata,
                [name]: value
            }
        })
    }

    const sendData = async (e) => {
        e.preventDefault();
        const { fname, email, mobile, password, cpassword } = udata

        const res = await fetch("register", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                fname, email, mobile, password, cpassword
            })
        });

        const data = await res.json();
        // console.log(data)

        if (res.status === 422 || !data) {
            // alert("Please enter the all details")
            toast.warning("Please enter the all details", {
                position: "top-center"
                // hideProgressBar: true
            })
        } else {
            // alert("data successfully addedd")
            toast.success("data sucessfully added", {
                position: "top-center"
                // hideProgressBar: true
            })
            setUdata({ ...udata, fname: "", email: "", mobile: "", password: "", cpassword: "" })
            history("/login")
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
                            <h1>Sign-Up</h1>
                            <div className="form_data">
                                <label htmlFor="fname">Your Name</label>
                                <input type="text" name="fname" id="fname"
                                    onChange={adddata}
                                    value={udata.fname} />
                            </div>
                            <div className="form_data">
                                <label htmlFor="email">Email</label>
                                <input type="text" name="email" id="email"
                                    onChange={adddata}
                                    value={udata.email} />
                            </div>
                            <div className="form_data">
                                <label htmlFor="mobile">Phone</label>
                                <input type="text" name="mobile" id="mobile"
                                    onChange={adddata}
                                    value={udata.mobile} />
                            </div>
                            <div className="form_data">
                                <label htmlFor="password">Password</label>
                                <input type="password" name="password" placeholder='Atleast 6 charachter...' id="password"
                                    onChange={adddata}
                                    value={udata.password} />
                            </div>
                            <div className="form_data">
                                <label htmlFor="cpassword">Confirm Password</label>
                                <input type="password" name="cpassword" id="cpassword"
                                    onChange={adddata}
                                    value={udata.cpassword} />
                            </div>
                            <button className='signin_btn' onClick={sendData} onKeyDown={handleKeyDown}>Continue</button>
                            <div className="sign_info">
                                <p>Already have an account?
                                    <NavLink className='signIn' to='/login'>Signin</NavLink>
                                </p>
                            </div>
                        </form>
                    </div>
                    <ToastContainer />
                </div>
            </section>
        </>
    )
}
