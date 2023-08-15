import React, { useContext, useEffect, useState } from 'react'
import './cart.css'
import { Divider } from '@mui/material'
import { useNavigate, useParams } from 'react-router-dom'
import { Logincontext } from '../context/Contextprovider'
import CircularProgress from '@mui/material/CircularProgress';
import StripeCheckout from 'react-stripe-checkout';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';




export const Cart = () => {

    const { id } = useParams("");
    // console.log(id)

    const history = useNavigate("")

    const { account, setAccount } = useContext(Logincontext)

    const [inddata, setIndedata] = useState("");
    console.log(inddata);

    const getinddata = async () => {
        const res = await fetch(`/getproductsone/${id}`, {
            method: "GET",
            headers: {
                // Accept: "application/json",
                "Content-Type": "application/json"
            },
            // credentials: "include"
        });

        const data = await res.json();
        // console.log(data);

        if (res.status !== 201) {
            console.log("no data available")
        } else {
            console.log("get data");
            setIndedata(data);
        }
    }

    useEffect(() => {
        setTimeout(getinddata, 1000)
    }, [id]);

    //add cart function 

    const addtocart = async (id) => {
        const checkres = await fetch(`/addcart/${id}`, {
            method: "POST",
            headers: {
                Accept: "application /json",
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                inddata
            }),
            credentials: "include"
        });


        const data1 = await checkres.json();
        console.log(data1);

        if (checkres.status === 401 || !data1) {
            console.log("user invalid");
            alert("user invalid");

        } else {
            // alert("data added in your cart");
            history("/buynow")
            setAccount(data1)
        }
    }

    const naviGate = () => {
        history("/login")
    }

    const onToken = (token) => {
        console.log(token)
        // alert('Payment successfull')
        toast.success("Payment Successfull", {
            position: "top-center"
        })
        history('/')
    }


    return (
        <>
            {inddata && Object.keys(inddata).length &&
                <div className="cart_section">
                    <div className="cart_container">
                        <div className="left_cart">
                            <img src={inddata.detailUrl} alt="cart_img" />
                            <div className="cart_btn">
                                {/* <button className='cart_btn1' onClick={() => addtocart(inddata.id)}>Add to cart</button> */}
                                {
                                    account ? <button className='cart_btn1' onClick={() => addtocart(inddata.id)}>Add to cart</button> :
                                        <button className='cart_btn1' onClick={() => naviGate(alert("Please login"))}>Add to cart</button>
                                }
                                {/* <button className='cart_btn1'>Buy Now</button> */}
                                <StripeCheckout className="cart_btn1"
                                    name='OnlineShoping'
                                    currency='INR'
                                    amount={inddata.price.cost + "00"}
                                    token={onToken}
                                    label="Buy Now"
                                    stripeKey="pk_test_51N8afVSDMINjoeOaAfhQn4vupvaPsWqIzfIVv6AYcSPXVdj65QG4mGWcvgrMB71KkFkm4qceyZcsvvVKp5GRfnVk00xk5HOqZy"
                                />
                            </div>
                        </div>
                        <div className="right_cart">
                            <h3>{inddata.title.shortTitle}</h3>
                            <h4>{inddata.title.longTitle}</h4>
                            <Divider />
                            <p className='mrp'>M.R.P: ₹{inddata.price.mrp}</p>
                            <p>Deal Of The Day: <span style={{ 'color': '#b12704' }}>₹{inddata.price.cost}</span></p>
                            <p>You Save: <span style={{ 'color': '#b12704' }}>₹{inddata.price.mrp - inddata.price.cost}({inddata.price.discount})</span></p>
                            <div className="discount_box">
                                <h5>Discount : <span style={{ 'color': '#111' }}>{inddata.discount}</span></h5>
                                <h4>Free Delivery : <span style={{ 'color': '#111', 'fontWeight': 600 }}>April 27 - 29</span>Details</h4>
                                <p>Fastest Delivery: <span style={{ 'color': '#111', 'fontWeight': 600 }}>Tomorrow 11 AM</span></p>
                            </div>
                            <p className='description'>About the Item: <span style={{ 'color': '#565659', 'fontSize': '14px', 'fontWeight': 500, 'letterSpacing': '0.4px' }}>{inddata.description}</span></p>
                        </div>
                    </div>
                </div>
            }


            {
                !inddata ?
                    <div className='circle'>
                        <CircularProgress />
                        <h2>Loading...</h2>
                    </div> :
                    ""
            }
            <ToastContainer />
        </>
    )
}
