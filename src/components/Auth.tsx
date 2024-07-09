import React, { useState } from 'react';
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import app from '../firebaseconfig';
import { redirect, useNavigate } from 'react-router-dom';

const Auth = () => {
  const userData = JSON.parse(localStorage.getItem('user-data') ?? "{}")
  const navigate = useNavigate();
  const keys:string[] = Object.keys(userData)
  if (keys.length>0) {
    navigate('/all')
  }
  const auth = getAuth(app);
  auth.languageCode = 'it';
  const provider = new GoogleAuthProvider();
  const signInWithGooglePopup = () => signInWithPopup(auth, provider);

  const logGoogleUser = async () => {
    const response = await signInWithGooglePopup();
    localStorage.setItem('user-data', JSON.stringify(response.user));
    console.log(response.user);
    navigate('/all')
  }
  return (
 
    <div className="flex flex-col gap-6 items-center justify-center h-screen dark:bg-gray-800">
      <h1 className='text-3xl text-white'>Sign In</h1>
    <button onClick={logGoogleUser} className="px-4 py-2 border flex gap-2 border-slate-200 dark:border-slate-700 rounded-lg text-slate-700 dark:text-slate-200 hover:border-slate-400 dark:hover:border-slate-500 hover:text-slate-900 dark:hover:text-slate-300 hover:shadow transition duration-150">
        <img className="w-6 h-6" src="https://www.svgrepo.com/show/475656/google-color.svg" loading="lazy" alt="google logo"/>
        <span>Login with Google</span>
    </button>
</div>
  )
}


export default Auth
