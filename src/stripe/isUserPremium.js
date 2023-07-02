import {auth, db} from '../components/firebase/config'
import {doc, getDoc} from 'firebase/firestore'
import {getIdToken, getIdTokenResult} from 'firebase/auth'

import {useAuth} from '../contexts/AuthContext'

export default async function isUserPremium(user) {
    await getIdToken(user,true);
    const decodedToken = await getIdTokenResult(user,true);
    const res = decodedToken?.claims?.stripeRole === 'pro' ? true : false;
    return res;
}  


