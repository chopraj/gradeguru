import {auth, db} from '../components/firebase/config'
import {doc, getDoc} from 'firebase/firestore'
import {getIdToken, getIdTokenResult} from 'firebase/auth'

import {useAuth} from '../contexts/AuthContext'

export default async function isUserPremium(user) {
    console.log(user);
    await getIdToken(user,true);
    const decodedToken = await getIdTokenResult(user,true);
    console.log(decodedToken.claims.stripeRole);
    const res = decodedToken?.claims?.stripeRole === 'pro' ? true : false;
    console.log(res);
    return res;
}  


