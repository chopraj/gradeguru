import React, { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase/config";

const PrivateRoute = () => {

    const navigate = useNavigate();

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            if (!currentUser) {
                console.log("User is not logged in. Redirecting...");
                navigate("/");
            } else {
                // console.log("User is logged in:", currentUser);
            }
        });

        return () => {
            unsubscribe();
        };
    }, []);

    return <Outlet />;
};

export default PrivateRoute;
