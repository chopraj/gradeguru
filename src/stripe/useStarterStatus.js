import {useEffect, useState} from 'react';

import isUserStarter from './isUserStarter';
import {useAuth} from '../contexts/AuthContext';

export default function usePremiumStatus() {
    const [isPremium, setIsPremium] = useState(false);
    const {firebaseUser} = useAuth();
    useEffect(() => {
        if (firebaseUser) {
            const checkPremiumStatus = async function () {
                setIsPremium(await isUserStarter(firebaseUser));
            };
            checkPremiumStatus();
        }
    }, [firebaseUser]);
    return isPremium;
}