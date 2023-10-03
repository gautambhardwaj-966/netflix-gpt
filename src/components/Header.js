import React,{useEffect} from 'react'
import { auth } from '../utils/firebase';
import { useNavigate } from 'react-router-dom';
import {signOut,onAuthStateChanged} from "firebase/auth";
import { useDispatch, useSelector } from 'react-redux';
import { addUser,removeUser } from '../utils/userSlice';
import { LOGO, SUPPORTED_LANGUAGES } from '../utils/constants';
import { toggleGptSearchView } from '../utils/gptSlice';
import lang from '../utils/languageConstants';
import { changeLangage } from '../utils/configSlice';

const Header = () => {
  const dispatch = useDispatch();
  const navigate=useNavigate();
  const user = useSelector((store) => store.user);
  const showGptSearch = useSelector((store) => store.gpt.showGptSearch)


  const handleSignOut=()=>{
    signOut(auth).then(() => {
      
      // Sign-out successful.
    }).catch((error) => {
      navigate("/error");
      // An error happened.
    });
  }

  useEffect(()=>{
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/auth.user
        const {uid,email,displayName,photoURL} = user;
        dispatch(addUser(
          {
          uid:uid,
          email:email,
          displayName:displayName,
          photoURL:photoURL,
      }));
        navigate("/browse");
        // ...
      } else {
        // User is signed out
        // ...
        dispatch(removeUser());
        navigate("/");
      }
    });
    //unsubscribe when components unmounts
   return() => unsubscribe();  
  },[]);


  // We will create new slice for GPT search
  const handleGptSearchClick = () =>  {
    //Toggle GPT search
    //To toggle we need to dispatch an action
    dispatch(toggleGptSearchView());
  };

  const handleLanguageChange=(e)=>{
dispatch(changeLangage(e.target.value))
//syntax - dispatch(name of the action)
  };
  
  return (
    // sm:bg-blue-900 md:bg-green-900 for small devices it will be blue for medium devices it will be green 
    <div className="absolute w-screen px-8 py-2 bg-gradient-to-b from-black z-10 flex flex-col md:flex-row md:justify-between">
      <img className="w-44 mx-auto" src={LOGO} alt="logo"/>

      {user && (
      <div className="flex p-2">

        {/* If showGptSearch is true then only show this Language dropdown button */}
        {showGptSearch && (<select className="p-2 m-2 bg-gray-900 text-white" onChange={handleLanguageChange}>
          {SUPPORTED_LANGUAGES.map(lang=><option key={lang.identifier} value={lang.identifier}>{lang.name}</option>)}
          
        {/* We use select for dropdown */}
        </select>)}

        {/* If showGptSearch is true then it will be Home Page else it will be GPT Serach */}
<button onClick={handleGptSearchClick} className="py-2 px-4 mx-4 my-2 bg-purple-800 text-white rounded-lg">{showGptSearch? "Home Page":  "GPT Search"}</button>
        <img className="w-12 h-12" alt="usericon" src={user?.photoURL}/>
        <button onClick={handleSignOut}
        className="font-bold text-white">(Sign Out)</button>
      </div>
)}
    </div>

  );
};

export default Header;
