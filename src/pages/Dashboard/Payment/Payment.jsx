import React from 'react';
import SectionTItles from '../../../Components/SectionTItles';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import CheckOutForm from './CheckOutForm';

//TODO
const stripePromise = loadStripe(import.meta.env.VITE_PAYMENT_KEY_PK)


const Payment = () => {
    return (
        <div>
            <SectionTItles heading={"Payment"} subHeading={'Please Pay To Confirm Your Order'}></SectionTItles>
            <div>
                <Elements stripe={stripePromise}>
                <CheckOutForm></CheckOutForm>
                </Elements>
            </div>
        </div>
    );
};

export default Payment;