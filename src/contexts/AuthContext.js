import React, { useContext, useEffect, useState } from "react";

import { auth } from "../components/firebase/config";

const AuthContext = React.createContext();

export const useAuth = () => {
    return useContext(AuthContext);
}

export const AuthProvider = ({ children }) => {
    const [firebaseUser, setFirebaseUser] = useState();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(async (user) => {
            if (user) {
                console.log("[AuthContext] firebase user found");
                setFirebaseUser(user);
                setLoading(false);
            } else {
                console.log("[AuthContext] firebase user NOT found");
                setLoading(false);
            }
        });

        return unsubscribe;
    }, []);


    const value = {
        firebaseUser
    }

    return (
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>
    );
};