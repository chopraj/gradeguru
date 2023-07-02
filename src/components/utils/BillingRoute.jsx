import { Outlet, useHistory, useNavigate } from "react-router-dom";
import React, { useEffect } from "react";

import { auth } from "../firebase/config";
import { onAuthStateChanged } from "firebase/auth";
import { useBilling } from "../../contexts/BillingContext";

const BillingRoute = () => {
    const url = window.location.pathname.split('/').pop();
    const navigate = useNavigate();
    const {userIsPremium, userIsStarter, isPaying } = useBilling();

    useEffect(() => {
        const timer = setTimeout(() => {
            if (!userIsPremium && !userIsStarter) {
                navigate("/app/billing");
            }
          }, 1000);
          return () => clearTimeout(timer);
        
    },[isPaying, navigate,url]);

    return <Outlet />;
};

export default BillingRoute;
