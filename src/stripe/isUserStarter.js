import {auth, db} from '../components/firebase/config'
import {doc, getDoc} from 'firebase/firestore'
import {getIdToken, getIdTokenResult} from 'firebase/auth'

import {useAuth} from '../contexts/AuthContext'

export default async function isUserStarter(user) {
    await getIdToken(user,true);
    const decodedToken = await getIdTokenResult(user,true);
    return decodedToken?.claims?.stripeRole === 'starter' ? true : false;
}   
