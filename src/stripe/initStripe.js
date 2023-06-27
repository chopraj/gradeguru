import {Stripe, loadStripe} from '@stripe/stripe-js';

let stripePromise;
// https://www.youtube.com/watch?v=P0Udy2Gi7n8
const initStripe = async () => {
    if (!stripePromise) {
        stripePromise = await loadStripe(
            "pk_test_51NMzakJVFY2CVxLQBt5ywP66Ac5hvt1qTBprwoG6HuqiopTipI7U5lDipGYyEEOdO6xegZJAGm1VHTmvSG8dyYe500RNXfcpTz"
        );
    }
    return stripePromise;
}

export default initStripe;