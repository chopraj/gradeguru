import {Stripe, loadStripe} from '@stripe/stripe-js';
let stripePromise;

// https://www.youtube.com/watch?v=P0Udy2Gi7n8
const initStripe = async () => {
    if (!stripePromise) {
        stripePromise = await loadStripe(
            process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY
        );
    }
    return stripePromise;
}

export default initStripe;