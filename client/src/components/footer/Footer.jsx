import React from 'react'
import './footer.css'

export const Footer = () => {

    const year = new Date().getFullYear();
    // console.log(year);

    return (
        <>
            <footer>
                <div className="footer_container">
                    <div className="footr_details_one">
                        <h3>Get to Know US</h3>
                        <p>About us</p>
                        <p>Careers</p>
                        <p>Press Releases</p>
                        <p>Customer Support</p>
                    </div>
                    <div className="footr_details_one">
                        <h3>Connect with Us</h3>
                        <p>Facebook</p>
                        <p>Twitter</p>
                        <p>Instagram</p>
                    </div>
                    <div className="footr_details_one forres">
                        <h3>Make Money with Us</h3>
                        <p>Facebook</p>
                        <p>Twitter</p>
                        <p>Instagram</p>
                    </div>
                    <div className="footr_details_one forres">
                        <h3>Make Money with Us</h3>
                        <p>Facebook</p>
                        <p>Twitter</p>
                        <p>Instagram</p>
                    </div>
                </div>
                <div className="lastdetails">
                    <h2 className='logo' id='flogo'>Online <span className='logo2'>Shoping</span></h2>
                    <p>Conditions of Use & Sale &nbsp; &nbsp;&nbsp;  Privacy Notice  &nbsp; &nbsp;&nbsp; Interest-Based Ads  &nbsp; &nbsp;&nbsp;  © 1996-{year}, OnlineShoping.com, Inc. or its affiliates</p>
                </div>
            </footer>
        </>
    )
}
