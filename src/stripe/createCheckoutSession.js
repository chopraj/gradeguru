import {addDoc, arrayUnion, collection, doc, onSnapshot, setDoc, updateDoc} from 'firebase/firestore'

import {db} from '../components/firebase/config'
import getStripe from './initStripe'

export async function createCheckoutSession(user,isProPlan) {
    const checkoutSessionRef = await addDoc(collection(db, 'users', user.uid, 'checkout_sessions'),{
        price: isProPlan ? "price_1NP9hJJVFY2CVxLQG9RPTYVe" : "price_1NP9jNJVFY2CVxLQD9ejGdoY",
        success_url: window.location.origin,
        cancel_url: window.location.origin,
    });
    // Wait for the CheckoutSession to get attached by the extension
    const unsub = onSnapshot(checkoutSessionRef,async (snap) => {
        const {error, sessionId} = snap.data();
        if (sessionId) {
            // We have a session, let's redirect to Checkout
            // Init Stripe
            const stripe = await getStripe();
            stripe.redirectToCheckout({sessionId});
        }
        if (error) {
            // Show an error to your customer and 
            // inspect your Cloud Function logs in the Firebase console.
            alert(`An error occured: ${error.message}`);
        }
    })
}