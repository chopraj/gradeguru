import React, {useEffect, useState} from 'react'
import {addDoc, arrayUnion, collection, doc, setDoc, updateDoc} from 'firebase/firestore'
import {auth, db} from '../firebase/config'

import GGLogo from '../../assets/GGLogo.png'
import { XCircleIcon } from '@heroicons/react/20/solid'
import { createUserWithEmailAndPassword } from "firebase/auth";
import { useAuth } from '../../contexts/AuthContext';
import { useNavigate } from "react-router-dom";

const ERRORS = {
  "Firebase: Error (auth/email-already-in-use).":
      "This email is already in use",
  "Firebase: Error (auth/internal-error).":
      "Server error, please try again",
};


const Login = () => {

  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword,setConfirmPassword] = useState("");
  const [error,setError] = useState(null);
  const {firebaseUser} = useAuth(auth);

  const handleSignUp = async (e) => {
    e.preventDefault();
    if (!checkInputs()) {
      return;
    }
    try {
      const userCredential = await createUserWithEmailAndPassword(auth,email,password);
      const userRef = await setDoc(doc(db, "users",userCredential.user.uid),{
        premiumUser: false,
        classes: []
      });
      navigate("/app");
    } catch (err) {
      console.log(err);
      console.log(err.message);
      if (err.message in ERRORS) {
        setError(ERRORS[err.message]);
      }
    }
  };


  const checkInputs = () => {
    if (!isEmail(email)) {
        setError("Please enter a valid email");
        return false;
    }
    if (password !== confirmPassword) {
        setError("Passwords do not match.");
        return false;
    }
    if (!isStrongPassword(password)) {
        setError("Password must be at least 6 characters.");
        return false;
    }
    return true;
    };

  function isStrongPassword(password) {
    return password.length >= 6;
  }

  function isEmail(email) {
    const re =
        /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
  }


  const handleEmailChange = (e) => {
    setEmail(e.target.value);
    setError("");
  };


  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
    setError("");
  };

  const handlePasswordConfirmChange = (e) => {
    setConfirmPassword(e.target.value);
    setError("");
  };

  const navigateToLogin = () => {
    navigate("/login");
  }

    return (
      <>
        <div className="flex min-h-full flex-1 flex-col justify-center py-12 sm:px-6 lg:px-8">
          <div className="sm:mx-auto sm:w-full sm:max-w-md">
            <img
              className="mx-auto h-10 w-auto"
              src={GGLogo}
              alt="Your Company"
            />
            <h2 className="mt-6 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
                Create your account 
            </h2>
          </div>
  
          <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-[480px]">
            <div className="bg-white px-6 py-12 shadow sm:rounded-lg sm:px-12">
            {error && (
              <div className="rounded-md bg-red-50 p-4 mb-6">
                <div className="flex">
                  <div className="flex-shrink-0">
                    <XCircleIcon className="h-5 w-5 text-red-400" aria-hidden="true" />
                  </div>
                  <div className="ml-3">
                    <h3 className="text-sm font-medium text-red-800">{error}</h3>
                  </div>
                </div>
              </div>
          )}
              <div className="space-y-6">
                <div>
                  <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                    Email address
                  </label>
                  <div className="mt-2">
                    <input
                      id="email"
                      value={email}
                      onChange={handleEmailChange}
                      name="email"
                      type="email"
                      autoComplete="email"
                      required
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>
  
                <div>
                  <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
                    Password
                  </label>
                  <div className="mt-2">
                    <input
                      id="password"
                      value={password}
                      onChange={handlePasswordChange}
                      name="password"
                      type="password"
                      autoComplete="current-password"
                      required
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
                    Confirm Password
                  </label>
                  <div className="mt-2">
                    <input
                      id="password"
                      value={confirmPassword}
                      onChange={handlePasswordConfirmChange}
                      name="password"
                      type="password"
                      autoComplete="current-password"
                      required
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>
  
  
                <div>
                  <button
                    onClick={handleSignUp}
                    type="submit"
                    className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                  >
                    Create Account
                  </button>
                </div>
              </div>
            </div>
  
            <p className="mt-10 text-center text-sm text-gray-500">
              Already a member?{' '}
              <a onClick={navigateToLogin} href="#" className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500">
                Log in!
              </a>
            </p>
          </div>
        </div>
      </>
    )
}

export default Login;