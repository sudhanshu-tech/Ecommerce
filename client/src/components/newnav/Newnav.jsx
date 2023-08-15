import React from 'react'
import "./newnav.css"

export const Newnav = () => {
    return (
        <>
            <div className='new_nav'>
                <div className="nav_data">
                    <div className="left_data">
                        <p className='first_col'>All</p>
                        <p className='first_col'>Mobile</p>
                        <p className='first_col'>Bestseller</p>
                        <p className='first_col'>Fashion</p>
                        <p className='first_col'>Customer Service</p>
                        <p className='first_col'>Electronics</p>
                        <p className='first_col'>Prime</p>
                        <p className='first_col'>Today's deal</p>
                        <p className='first_col'>Wallet Pay</p>
                    </div>
                    <div className="right_data">
                        <p className='second_col'>New Launches from mobiles, Electronics & more | Shop Now</p>
                    </div>
                </div>
            </div>
        </>
    )
}
