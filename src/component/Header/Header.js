import React, { useState } from 'react';
import { useContext } from 'react';
import { Link, useHistory, useLocation } from 'react-router-dom';
import { UserContext } from '../../App';
import logo from '../../images/logo.png';
import { handleGoogleSignIn, initializeLoginFramework } from '../Login/LoginManager';
import './Header.css';

const Header = () => {
    const [loggedInUser, setLoggedInUser] = useContext(UserContext);
    const [user, setUser] = useState({
        isSignedIn: false,
        newUser: false,
        name: '',
        email: '',
        password: '',
        photo: '',
        error: '',
        success: ''
    });

    initializeLoginFramework();

    const history = useHistory();
    const location = useLocation();
    let { from } = location.state || { from: { pathname: "/" } };


    const googleSignIn = () => {
        handleGoogleSignIn()
            .then(res => {
                setUser(res);
                setLoggedInUser(res);
                history.replace(from);
            })
    };

    return (
        <div className="header">
            <img src={logo} alt="" />
            <nav>
                <Link to="/shop">Shop</Link>
                <Link to="/review">Order Review</Link>
                <Link to="/orders">Manege Inventory</Link>
                {
                    loggedInUser.isSignedIn ? <button onClick={() => setLoggedInUser({})}>Sign Out</button> : <button onClick={googleSignIn}>Sign In</button>
                }
            </nav>
        </div>
    );
};

export default Header;