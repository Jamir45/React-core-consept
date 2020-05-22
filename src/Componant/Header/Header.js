import React from 'react';
import logo from '../../images/logo.png'
import './Header.css'
import { useAuth } from '../Login/useAuth';
import { Link } from 'react-router-dom';

const Header = () => {
    const auth = useAuth()
    return (
        <div className="header">
            <img src={logo} alt=""/>
            <nav className="navMenu">
                <div className='container'>
                    <a href="/shop">Shop</a>
                    <a href="/review">Order Review</a>
                    <a href="/manage">Manage Inventory</a>
                    {
                        auth.user ? <Link to='/login'><span style={{color:'orange'}}><img className='rounded-circle' id='profile' src={auth.user.photo} alt=""/></span></Link> : 
                        <Link to='/login'><span style={{color:'orange', float:'right'}}><b>Log In</b></span>
                        </Link> 
                    }
                </div>
            </nav>
        </div>
    );
};

export default Header;