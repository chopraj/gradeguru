import React, {useState} from 'react'
import {auth} from '../firebase/config'
import { signInWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { XCircleIcon } from '@heroicons/react/20/solid'


const ERRORS = {
  "Firebase: Error (auth/wrong-password).": "Incorrect username or password",
  "Firebase: Error (auth/user-not-found).": "Incorrect username or password",
  "Firebase: Error (auth/internal-error).": "Server error, please try again",
  "Firebase: Error (auth/invalid-email).": "Please enter a valid email",
  "Firebase: Error (auth/missing-email).": "Please enter an email",
  "Firebase: Error (auth/missing-password).": "Please enter a password",
};

const Login = () => {

  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState('');


  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      console.log(userCredential.user.uid);
      
      navigate("/app"); 
    } catch (err) {
      console.log(err,err.message);
      if (err.message in ERRORS) {
        setError(ERRORS[err.message]);
      } 
    }
  }

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
    setError("");
};

const handlePasswordChange = (e) => {
    setPassword(e.target.value);
    setError("");
};

const navigateToSignup = () => {
  navigate("/signup");
}

const navigateToForgotPassword = () => {
  navigate("/forgot-password");
}

    return (
      <>
        <div className="flex min-h-full flex-1 flex-col justify-center py-12 sm:px-6 lg:px-8">
          <div className="sm:mx-auto sm:w-full sm:max-w-md">
            <img
              className="mx-auto h-10 w-auto"
              src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
              alt="Your Company"
            />
            <h2 className="mt-6 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
              Sign in to your account
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
              <div className="space-y-6" >
                <div>
                  <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                    Email address
                  </label>
                  <div className="mt-2">
                    <input
                      id="email"
                      onChange={handleEmailChange}
                      value={email}
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
                      onChange={handlePasswordChange}
                      value={password}
                      name="password"
                      type="password"
                      autoComplete="current-password"
                      required
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>
  
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <input
                      id="remember-me"
                      name="remember-me"
                      type="checkbox"
                      className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
                    />
                    <label htmlFor="remember-me" className="ml-3 block text-sm leading-6 text-gray-900">
                      Remember me
                    </label>
                  </div>
  
                  <div className="text-sm leading-6">
                    <a onClick={navigateToForgotPassword} href="#" className="font-semibold text-indigo-600 hover:text-indigo-500">
                      Forgot password?
                    </a>
                  </div>
                </div>
  
                <div>
                  <button
                    onClick={handleLogin}
                    type="submit"
                    className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                  >
                    Sign in
                  </button>
                </div>
              </div>
            </div>
  
            <p className="mt-10 text-center text-sm text-gray-500">
              Not a member?{' '}
              <a onClick={navigateToSignup} href="#" className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500">
                Create your account here!
              </a>
            </p>
          </div>
        </div>
      </>
    )
}

export default Login;