import React, { useEffect, useState } from 'react'
import './buynow.css'
import { Divider } from '@mui/material'
import { Option } from './Option'
import { Subtotal } from './Subtotal'
import { Right } from './Right'

export const Buynow = () => {

    const [cartdata, setCartdata] = useState("");
    // console.log(cartdata.carts)

    const getdatabuy = async () => {
        const res = await fetch("/cartdetails", {
            method: "GET",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json"
            },
            credentials: "include"
        });

        const data = await res.json();

        if (res.status !== 201) {
            console.log("error")
        } else {
            setCartdata(data.carts)
        }
    };

    useEffect(() => {
        getdatabuy();
    }, []);

    return (
        <>
            {
                cartdata.length ? <div className="buynow_section">
                    <div className="buynow_container">
                        <div className="left_buy">
                            <h1>Shoping Cart</h1>
                            <p>Select All Items</p>
                            <span className='leftbuyprice'>Price</span>
                            <Divider />
                            {
                                cartdata.map((e, k) => {
                                    return (
                                        <>
                                            <div className="item_containert" key={e.id}>
                                                <img src={e.detailUrl} alt="" />
                                                <div className="item_details">
                                                    <h3>{e.title.longTitle}</h3>
                                                    <h3>{e.title.shortTitle}</h3>
                                                    <h3 className='diffrentprice'>₹4000</h3>
                                                    <p className='unusuall'>Usually dispatched in 4 days</p>
                                                    <p>Eligible for free delivery</p>
                                                    <Option deletedata={e.id} get={getdatabuy} />
                                                </div>
                                                <h3 className='item_price'>₹{e.price.cost}</h3>
                                            </div>
                                            <Divider />
                                        </>
                                    )
                                })
                            }

                            <Subtotal item={cartdata} />
                        </div>
                        <Right item={cartdata} />
                    </div>
                </div> : <h1 style={{ margin: '200px', textAlign: 'center' }}>Your cart is empty</h1>
            }

        </>
    )
}
