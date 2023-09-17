import React, { useState,useRef } from 'react'
import Header from './Header'
import { checkValidData } from '../utils/validate';
import {  createUserWithEmailAndPassword ,signInWithEmailAndPassword,updateProfile} from "firebase/auth";
import { auth } from '../utils/firebase';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { addUser } from '../utils/userSlice';
import { USER_AVATAR } from '../utils/constants';
const Login = () => {

    const[isSignInForm,setIsSignInForm]=useState(true);
    const [errorMessage,setErrorMessage] = useState(null);
   
    const dispatch = useDispatch();

    //This is how we use useRef
    const name = useRef(null);
    const email = useRef(null);
    const password = useRef(null);

    const handleButtonClick =()=>{
        //validate the form data
//checkValidData(email,password);

const message = checkValidData(email.current.value,password.current.value);
setErrorMessage(message);
if(message) return;

if(!isSignInForm)
{
  //Sign Up Logic
  createUserWithEmailAndPassword(
    auth,
    email.current.value,
    password.current.value)
  .then((userCredential) => {
    // Signed in 
    const user = userCredential.user;
    updateProfile(user, {
      displayName: name.current.value, 
      //I first used photoURL:{USER_AVATAR} and it didnt worked because it is not JSX,
      photoURL:USER_AVATAR,
    })
    .then(() => {
      const {uid,email,displayName,photoURL} = auth.currentUser;
      dispatch(addUser(
        {
        uid:uid,
        email:email,
        displayName:displayName,
        photoURL:photoURL,
    })
    );
   
      // Profile updated!
      // ...
    }).catch((error) => {
      setErrorMessage(error.message);
      // An error occurred
      // ...
    });
    // ...
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    setErrorMessage(errorCode+"-"+errorMessage);
    // ..
  });

}
else{
  //Sign in Logic
  signInWithEmailAndPassword(auth, email.current.value,password.current.value)
  .then((userCredential) => {
    // Signed in 
    const user = userCredential.user;
    
    // ...
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    setErrorMessage(errorCode+"-"+errorMessage);
  });

}


    };

    const toggleSignInForm =()=>{
setIsSignInForm(!isSignInForm);
    };

  return (
    <div>
      <Header/>
      <div className="absolute">
      <img src="https://assets.nflxext.com/ffe/siteui/vlv3/855ed6e2-d9f1-4afd-90da-96023ec747c3/85eb5b91-25ed-4965-ace9-ba8e4a0ead8d/IN-en-20230828-popsignuptwoweeks-perspective_alpha_website_large.jpg" alt="logo"/>
      </div>
      <form
      onSubmit={(e)=>e.preventDefault()} 
      className="w-3/12 absolute p-12 bg-black my-36 mx-auto right-0 left-0 text-white bg-opacity-80">
        <h1 className="font-bold text-3xl py-4">{isSignInForm ? "Sign In" : "Sign Up"}</h1>
        {!isSignInForm && 
        <input 
        //useRef Reference
        ref={name}
        type="text" 
        placeholder="Full Name" 
        className="p-4 my-4 w-full bg-gray-700"/>}

        <input 
        //useRef Reference
        ref={email}
        type="text" 
        placeholder="Email Address" 
        className="p-4 my-4 w-full bg-gray-700"/>

        <input 
        //useRef Reference
        ref={password}
        type="password" 
        placeholder="Password" 
        className="p-4 my-4 w-full bg-gray-700"/>
<p className="p-4 my6 text-red-500 font-bold text-lg py-2">{errorMessage}</p>
        <button 
        className="p-4 my-6 bg-red-700 w-full rounded-lg" onClick={handleButtonClick}>{isSignInForm ? "Sign In" : "Sign Up"}</button>
        <p 
        className="py-4 cursor-pointer" 
        onClick={toggleSignInForm}>{isSignInForm ? "New To Netflix? Sign Up Now" :"Already Registered? Sign In Now"}</p>
      </form>
    </div>
  )
}

export default Login;
