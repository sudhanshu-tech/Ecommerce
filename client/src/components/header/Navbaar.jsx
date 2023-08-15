import React, { useContext, useEffect, useState } from 'react'
import "./navbaar.css"
import SearchIcon from '@mui/icons-material/Search';
import { Badge, Avatar } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Drawer from '@mui/material/Drawer';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { NavLink, useNavigate } from 'react-router-dom';
import { Logincontext } from '../context/Contextprovider'
import { Leftheader } from './Leftheader';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem'
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import LogoutIcon from '@mui/icons-material/Logout';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useSelector } from 'react-redux';


export const Navbaar = () => {

    const { account, setAccount } = useContext(Logincontext);
    // console.log(account)

    const history = useNavigate("");

    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    const [text, setText] = useState("");
    // console.log(text)

    const [listopen, setListopen] = useState(true);

    const { products } = useSelector(state => state.getproductsdata)


    const [dropen, setDropen] = useState(false)

    const getdetailvaliduser = async () => {
        const res = await fetch("/validuser", {
            method: "GET",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json"
            },
            credentials: "include"
        });

        const data = await res.json();
        // console.log(data);

        // if (res.status !== 201) {
        //     // console.log("error");
        // } else {
        //     console.log("data valid");
        //     // setAccount(data);
        // }
    }

    const handleopen = () => {
        setDropen(true)
    }

    const handledrclose = () => {
        setDropen(false)
    }

    const logoutuser = async () => {
        const res2 = await fetch("/logout", {
            method: "GET",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json"
            },
            credentials: "include"
        });

        const data2 = await res2.json();
        // console.log(data);

        if (res2.status !== 201) {
            console.log("error");
        } else {
            console.log("data valid");
            // alert("Logout successful")
            toast.success("Logout successful", {
                position: "top-center"
            })
            history("/")
            setAccount(false);
        }
    }

    const getText = (items) => {
        setText(items)
        setListopen(false)
    }

    useEffect(() => {
        getdetailvaliduser();
    }, [])

    return (
    <>
    <header>
    <nav>
    <div className="left">

    <IconButton className='hamburgur' onClick={handleopen}>
    <MenuIcon style={{ 'color': '#fff' }} />
    </IconButton>
    <Drawer open={dropen} onClose={handledrclose}>
    <Leftheader closedr={handledrclose} logoutuser={logoutuser} />
    </Drawer>
    <div className="navlogo">
        <NavLink id='link' to='/'><h2 className='logo'>Online <span className='logo2'>Shoping</span></h2></NavLink>
        </div>
        <div className="nav_searchbaar">
        <input type="text" name="" id=""
        placeholder='Search your Products...'
        onChange={(e) => getText(e.target.value)}
        />
        <div className="search_icon">
        <SearchIcon id="search" />
        </div>

        {
        // search filter
        text &&
        <List className='extrasearch' hidden={listopen}>
        {
            products.filter(product => product.title.longTitle.toLowerCase().includes(text.toLowerCase())).map(product => (
            <ListItem>
            <NavLink to={`/getproductsone/${product.id}`} onClick={() => setListopen(true)}>
                                                    {product.title.longTitle}
                                                </NavLink>
</ListItem>
))
}
</List>
 }
</div>
</div>
<div className="right">
{
    account ? "" :
    <div className="nav_btn">
    <NavLink to="/login">SignIn</NavLink>
    </div>
     }
    <div className="cart_btn">
    {
    account ? <NavLink to="/buynow">
    <Badge badgeContent={account.carts.length} color="primary">
    <ShoppingCartIcon id="icon" />
    </Badge>
    </NavLink> : <NavLink to="/login">
    <Badge badgeContent={0} color="primary">
    <ShoppingCartIcon id="icon" />
    </Badge>
    </NavLink>
    }

    <ToastContainer />
    <p>Cart</p>
    </div>
    {
    account ? <Avatar className='avtar2'
        id="basic-button"
        aria-controls={open ? 'basic-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
        >{account.fname[0].toUpperCase()}</Avatar> :
        <Avatar className='avtar'
        id="basic-button"
        aria-controls={open ? 'basic-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
        />
        }
        <Menu
            id="basic-menu"
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            MenuListProps={{
            'aria-labelledby': 'basic-button',
            }}
            >
            {/* <MenuItem onClick={handleClose}>My account</MenuItem> */}
            {
            !account ? <NavLink to='/login' style={{ textDecoration: 'none', color: 'black' }}><MenuItem onClick={handleClose}>My account</MenuItem></NavLink> : ""
            }

            {
                account ? <MenuItem onClick={handleClose}><LogoutIcon style={{ 'fontSize': '16', 'marginRight': '3' }} onClick={logoutuser} />Logout</MenuItem> : ""
                }

                        </Menu>
                    </div>
                </nav>
            </header>
        </>
    )
}
