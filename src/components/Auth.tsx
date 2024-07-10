import React, { useState } from 'react';
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import app from '../firebaseconfig';
import { redirect, useNavigate } from 'react-router-dom';

const Auth = () => {
  const userData = JSON.parse(localStorage.getItem('user-data') ?? "{}")
  const navigate = useNavigate();
  const keys: string[] = Object.keys(userData)
  if (keys.length > 0) {
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

    <div className='w-screen h-screen flex flex-col md:flex-row md:gap-14 dark:bg-gray-800 md:p-24 '>
      <div className="flex flex-col items-center justify-center h-full">

        <h1 className='text-4xl text-white mb-6 font-bold'> E-commerce Store  </h1>
        <p className="text-center text-gray-300 mb-4 max-w-md">
          Discover a wide range of products and shop conveniently with your Google account.
          Login now to start exploring!
        </p>
        <button onClick={logGoogleUser} className="m-6 flex items-center justify-center px-4 py-2 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-700 dark:text-slate-200 hover:border-slate-400 dark:hover:border-slate-500 hover:text-slate-900 dark:hover:text-slate-300 hover:shadow transition duration-150">
          <img className="w-6 h-6 mr-2" src="https://www.svgrepo.com/show/475656/google-color.svg" loading="lazy" alt="google logo" />
          <span className="font-semibold">Login with Google</span>
        </button>
        <p className="text-gray-300 mt-4 text-center">
          New to our store?
          Sign up here
          and discover a world of shopping convenience!
        </p>

      </div>
    </div>
  )
}


export default Auth
