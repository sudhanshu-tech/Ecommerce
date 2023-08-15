import React, { useState, useEffect, useContext } from 'react'
import StripeCheckout from 'react-stripe-checkout';
import { useNavigate } from 'react-router-dom';
import { Logincontext } from '../context/Contextprovider'
import { ToastContainer, toast } from 'react-toastify';


export const Right = ({ item, deletedata, get }) => {


    const [price, setPrice] = useState(0);
    const navigate = useNavigate()

    const { account, setAccount } = useContext(Logincontext);

    const removedata = async (req, res) => {
        try {
            const res = await fetch(`/remove/${deletedata}`, {
                method: "DELETE",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json"
                },
                credentials: "include"
            });

            const data = await res.json();
            console.log(data);

            if (res.status === 400 || !data) {
                console.log("error");
            } else {
                // console.log("user delete");
                setAccount(data);
                get();
            }

        } catch (error) {
            console.log("error");
        }
    }


    useEffect(() => {
        totalAmount();
    }, [item])

    const totalAmount = () => {
        let price = 0;
        item.map((item) => {
            price += item.price.cost
        });

        setPrice(price)
    }


    // stripe

    const onToken = (token) => {
        console.log(token)
        // alert('Payment successfull')
        toast.success("Payment Successfull", {
            position: 'top-center'
        })
        navigate('/')
        return account.carts.length = 0
    }



    return (
        <>
            <div className="right_buy">
                {/* <img src="https://images-eu.ssl-images-amazon.com/images/G/31/checkout/assets/TM_desktop._CB443006202_.png" alt="rightimg" /> */}
                <h3 style={{ 'backgroundColor': 'white', 'textAlign': 'center', 'marginTop': '0' }}>100% Purchase Protection
                    <br /><span style={{ 'fontSize': '10px', 'color': 'orange' }}>Original Products | Secure Payments</span></h3>
                <div className="cost_right">
                    <p>Your order is eligible for FREE Delivery. </p> <br />
                    <span style={{ color: "#565959" }}> Select this option at checkout. Details</span>
                    <h3>Subtotal ( {item.length} items): <span style={{ fontWeight: "700" }}> ₹{price}</span></h3>
                    {/* <button className="rightbuy_btn" >Proceed to Buy</button> */}
                    <StripeCheckout className="rightbuy_btn"
                        name='OnlineShoping'
                        currency='INR'
                        amount={price + "00"}
                        token={onToken}
                        onClick={() => removedata(deletedata)}
                        label="Proceed to Checkout"
                        stripeKey="pk_test_51N8afVSDMINjoeOaAfhQn4vupvaPsWqIzfIVv6AYcSPXVdj65QG4mGWcvgrMB71KkFkm4qceyZcsvvVKp5GRfnVk00xk5HOqZy"
                    />
                </div>
                <ToastContainer />
            </div>
        </>
    )
}
