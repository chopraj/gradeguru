import { Outlet, useNavigate } from "react-router-dom";
import React, { useEffect } from "react";

import { auth } from "../firebase/config";
import { onAuthStateChanged } from "firebase/auth";

const PrivateRoute = () => {

    const navigate = useNavigate();

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            if (!currentUser) {
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
