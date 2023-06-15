// Imports
import React from "react";
import {
    createBrowserRouter,
    createRoutesFromElements,
    Outlet,
    Route,
    RouterProvider,
} from "react-router-dom";

import Landing from './components/Landing.jsx'
import DashboardLayout from "./layouts/DashboardLayout.jsx";
import Login from './components/Login/Login.jsx';
import Signup from './components/Login/Signup.jsx'
import Classes from './components/app/Classes.jsx';
import Class from './components/app/Class.jsx';
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
            
            {/* private route goes around this */}
            <Route path='app' element={<DashboardLayout/>}>
                {/*add index path here*/}
                <Route path="classes" element={<Classes/>}>
                  <Route path=":classId" element={<Class/>}>
                    <Route path=":studentId" element={<Student/>}/>
                  </Route>
                </Route>
            </Route> 
        </Route>
    )
)


// The main React App component
const App = () => {
    return <RouterProvider router={router}/>
};



export default App;
