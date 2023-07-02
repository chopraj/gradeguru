import React, { useContext, useEffect, useState } from "react";

import Billing from "../components/app/Billing";
import { auth } from "../components/firebase/config";
import {useAuthState} from 'react-firebase-hooks/auth';
import usePremiumStatus from "../stripe/usePremiumStatus";
import useStarterStatus from "../stripe/useStarterStatus";

const BillingContext = React.createContext();

export const useBilling = () => {
    return useContext(BillingContext);
}

export const BillingProvider = ({ children }) => {
    const {firebaseUser} = useAuthState(auth);
    const userIsPremium = usePremiumStatus(firebaseUser);
    const userIsStarter = useStarterStatus(firebaseUser);

    


    const value = {
        userIsPremium,userIsStarter,isPaying : userIsPremium || userIsStarter
    }

    return (
        <BillingContext.Provider value={value}>
            {children}
        </BillingContext.Provider>
    );
};