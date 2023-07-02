import React, { useContext, useEffect, useState } from "react";

import { auth } from "../components/firebase/config";

const AuthContext = React.createContext();

export const useAuth = () => {
    return useContext(AuthContext);
}

export const AuthProvider = ({ children }) => {
    const [firebaseUser, setFirebaseUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(async (user) => {
            if (user) {
                setFirebaseUser(user);
                setLoading(false);
            } else {
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