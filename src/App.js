// Imports
import React from "react";
import {
    createBrowserRouter,
    createRoutesFromElements,
    Outlet,
    Route,
    RouterProvider,
} from "react-router-dom";

import {AuthProvider} from './contexts/AuthContext';
import PrivateRoute from "./components/utils/PrivateRoute";

import Landing from './components/Landing.jsx'
import DashboardLayout from "./layouts/DashboardLayout.jsx";


import Login from './components/Login/Login.jsx';
import Signup from './components/Login/Signup.jsx'


import Classes from './components/app/Classes.jsx';
import Class from './components/app/Class.jsx';
import Student from './components/app/Student.jsx';
import Grade from './components/app/Grade.jsx';
import ContactUs from "./components/app/ContactUs.jsx";





const Root = () => {
    return (
        <>
        <Outlet/>
        </>
    )
}


const router = createBrowserRouter(
    createRoutesFromElements(
        <Route path='/' element={<Root/>}>
            <Route index element={<Landing/>}/>
            <Route path="login" element={<Login/>}/>
            <Route path="signup" element={<Signup/>}/>
            
            <Route element={<PrivateRoute/>}>
                <Route path='app' element={<DashboardLayout/>}>
                    {/*add index path here (Dashboard maybe??) */}
                    <Route path="classes">
                    <Route index element={<Classes/>}/> 
                    <Route path=":classId" element={<Class/>}>
                        <Route path=":studentId" element={<Student/>}/>
                    </Route>
                    </Route>

                    <Route path="grade" element={<Grade/>}/>

                    <Route path="contact-us" element={<ContactUs/>}/>
                </Route>
            </Route>
        </Route>
    )
)


// The main React App component
const App = () => {
    return (
        <AuthProvider>
            <RouterProvider router={router}/>
        </AuthProvider>
    )
};



export default App;
