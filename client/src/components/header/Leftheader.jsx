import React, { useContext } from 'react'
import "./leftheader.css"
import { Avatar, Divider } from '@mui/material'
import { Logincontext } from '../context/Contextprovider'
import { NavLink } from 'react-router-dom'
import LogoutIcon from '@mui/icons-material/Logout';

export const Leftheader = ({ closedr, logoutuser }) => {

    const { account } = useContext(Logincontext);
    // const { account, setAccount } = useContext(Logincontext);

    return (
        <>
            <div className="rightheader">
                <div className="right_nav">
                    {
                        account ? <Avatar className='avtar2'>{account.fname[0].toUpperCase()}</Avatar> :
                            <Avatar className='avtar' />
                    }
                    {
                        account ? <h3>Hello, {account.fname.toUpperCase()}</h3> : ""
                    }

                </div>
                <div className="nav_btn" onClick={() => closedr()}>
                    <NavLink to='/'>Home</NavLink>
                    <NavLink to='/'>ShopByCategory</NavLink>

                    <Divider style={{ 'width': "100%", 'marginLeft': '-20px' }} />

                    <NavLink to='/'>Today's Deal</NavLink>
                    {
                        account ? <NavLink to='/buynow'>Your Orders</NavLink> : <NavLink to='/login'>Your Orders</NavLink>
                    }

                    <Divider style={{ 'width': "100%", 'marginLeft': '-20px' }} />
                    <div className="flag">
                        <NavLink to='/' style={{ paddingTop: 17 }}>Settings</NavLink>
                        <img src="./india.png" style={{ width: 35, marginLeft: 10 }} alt="" />
                    </div>
                    {
                        account ? <div className="flag">
                            <LogoutIcon style={{ fontSize: 18, marginRight: 4 }} />
                            <h3 style={{ cursor: 'pointer' }} onClick={() => logoutuser()} >Logout</h3>
                        </div> :
                            <NavLink to='/login'>SignIn</NavLink>
                    }
                </div>
            </div>
        </>
    )
}
