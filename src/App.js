import {
    Outlet,
    Route,
    RouterProvider,
    createBrowserRouter,
    createRoutesFromElements,
} from "react-router-dom";

import {AuthProvider} from './contexts/AuthContext';
import Billing from "./components/app/Billing";
import Class from './components/app/Class.jsx';
import Classes from './components/app/Classes.jsx';
import ContactUs from "./components/app/ContactUs.jsx";
import DashboardLayout from "./layouts/DashboardLayout.jsx";
import Grade from './components/app/Grade.jsx';
import Landing from './components/Landing/Landing.jsx';
import Login from './components/Login/Login.jsx';
import PrivateRoute from "./components/utils/PrivateRoute";
// Imports
import React from "react";
import Signup from './components/Login/Signup.jsx'
import Student from './components/app/Student.jsx';

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

                    <Route path="billing" element={<Billing/>}/>
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
