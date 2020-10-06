import React, { useState, useContext } from 'react';
import { } from 'react';
import { UserContext } from '../../App';
import { useHistory, useLocation } from 'react-router-dom';
import { handleGoogleSignIn, initializeLoginFramework, handleSignOut, handleFbSignIn, createUserWithEmailAndPassword, signInWithEmailAndPassword, resetPassword } from './LoginManager';


function Login() {
  const [newUser, setNewUser] = useState(false);
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

  const [loggedInUser, setLoggedInUser] = useContext(UserContext);

  let history = useHistory();
  const location = useLocation();

  let { from } = location.state || { from: { pathname: "/" } };

  const googleSignIn = () => {
    handleGoogleSignIn()
      .then(res => {
        handleResponse(res, true);
      })
  };

  const fbSignIn = () => {
    handleFbSignIn()
      .then(res => {
        handleResponse(res, true);
      })
  }

  const signOut = () => {
    handleSignOut()
      .then(res => {
        handleResponse(res, false);
      })
  }

  const handleResponse = (res, redirect) => {
    setUser(res);
    setLoggedInUser(res);
    if (redirect) {
      history.replace(from);
    }
  }

  const handleBlur = (e) => {
    let isFieldValid = true;
    if (e.target.name === 'email') {
      isFieldValid = /\S+@\S+\.\S+/.test(e.target.value);
    }
    if (e.target.name === 'password') {
      const isPasswordValid = e.target.value.length > 6;
      const passwordHasNumber = /\d{1}/.test(e.target.value);
      isFieldValid = isPasswordValid && passwordHasNumber;
    }
    if (isFieldValid) {
      const newUserInfo = { ...user };
      newUserInfo[e.target.name] = e.target.value;
      setUser(newUserInfo);
    }
  }

  const handleSubmit = (e) => {
    if (newUser && user.email && user.password) {
      createUserWithEmailAndPassword(user.name, user.email, user.password)
        .then(res => {
          handleResponse(res, true);
        })
    }

    if (!newUser && user.email && user.password) {
      signInWithEmailAndPassword(user.email, user.password)
        .then(res => {
          handleResponse(res, true);
        })
    }

    e.preventDefault();
  }



  return (
    <div style={{ textAlign: 'center' }}>
      {
        user.isSignedIn ? <button onClick={signOut}>Sign Out</button> : <button onClick={googleSignIn}>Sign in</button>
      }
      <br />
      <button onClick={fbSignIn}>Sign In Using Facebook</button>
      {
        user.isSignedIn && <div>
          <p>Welcome, {user.name} </p>
          <p>Email : {user.email}</p>
          <img src={user.photo} alt="" />
        </div>
      }

      <h1>Our Own Authentication</h1>
      <input type="checkbox" onChange={() => setNewUser(!newUser)} name="newUser" id="" />
      <label htmlFor="newUser" >New User Sign Up</label>

      <form onSubmit={handleSubmit}>
        {newUser && <input name="name" type="text" onBlur={handleBlur} placeholder="Your name" />}
        <br />
        <input type="text" name="email" onBlur={handleBlur} placeholder="Your Email address" required />
        <br />
        <input type="password" onBlur={handleBlur} name="password" placeholder="Your password" required />
        <br />
        <input type="submit" value={newUser ? "Sign Up" : 'Sign In'} />
      </form>
      <button onClick = {() => resetPassword(user.email)}>Forget or Reset Password</button>
      <p style={{ color: 'red' }}>{user.error}</p>
      {
        user.success && <p style={{ color: 'green' }}> User {newUser ? 'Create' : 'Login'} Account Successfully.</p>
      }
    </div>
  );
}

export default Login;
