import React, { useEffect, useState } from 'react';
import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import useCart from '../../../hooks/useCart';
import useAuth from '../../../hooks/useAuth';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

const CheckOutForm = () => {
    const stripe = useStripe();
    const elements = useElements();
    const [error, setError] = useState(null);
    const [transactionId, setTransactionId] = useState()
    const [clientSecret, setClientSecret] = useState('')
    const axiosSecure = useAxiosSecure()
    const { user } = useAuth()
    const [cart, refetch] = useCart()
    const totalPrice = cart.reduce((total, item) => total + item.price, 0)
    const navigate = useNavigate()

    useEffect(() => {
        if (totalPrice > 0) {
            axiosSecure.post('/create-payment-intent', { price: totalPrice })
                .then(res => {
                    console.log(res.data.clientSecret)
                    setClientSecret(res.data.clientSecret)
                })
        }
    }, [axiosSecure, totalPrice])

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (!stripe || !elements) {
            return;
        }
        const card = elements.getElement(CardElement);
        if (card === null) {
            return;
        }

        const { error, paymentMethod } = await stripe.createPaymentMethod({
            type: 'card',
            card,
        });

        if (error) {
            setError(error.message);
            console.log('Payment method Error', error);
        } else {
            setError(null);
            console.log('Payment', paymentMethod);
        }

        //Confirm Payment 
        const { paymentIntent, error: confirmError } = await stripe.confirmCardPayment(clientSecret, {
            payment_method: {
                card: card,
                billing_details: {
                    email: user?.email || 'anonymous',
                    name: user?.displayName || 'anonymous'
                }
            }
        })
        if (confirmError) {
            console.log('Confirm Error')
        }
        else {
            console.log(paymentIntent, 'Payment Intent')
            if (paymentIntent.status === 'succeeded') {
                console.log('TRX ID', paymentIntent.id)
                setTransactionId(paymentIntent.id);

                //Saving Payment Information in the database
                const payment = {
                    email: user.email,
                    price: totalPrice,
                    transactionId: paymentIntent.id,
                    date: new Date(),
                    cartIds: cart.map(item => item._id),
                    menuItemIds: cart.map(item => item.menuId),
                    status: 'pending'
                }
                const res = await axiosSecure.post('/payments', payment)
                refetch()
                if (res.data?.paymentResult?.insertedId) {
                    toast.success('Payment Successful, Thank You For Order')
                    navigate('/dashboard/paymentHistory')
                }
            }
        }
    };

    return (
        <div className="max-w-xl space-y-6 mx-auto p-6 bg-white rounded-lg shadow-md">
            <h2 className="text-2xl font-bold mb-4 text-center text-gray-800">Payment Information</h2>
            <p className="text-center text-gray-600 mb-6">Please enter your payment details below.</p>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div className="form-group">
                    <CardElement
                        options={{
                            style: {
                                base: {
                                    fontSize: '16px',
                                    color: '#424770',
                                    '::placeholder': {
                                        color: '#aab7c4',
                                    },
                                },
                                invalid: {
                                    color: '#9e2146',
                                },
                            },
                        }}
                        className="p-2 border border-gray-300 rounded"
                    />
                </div>
                {error && <div className="text-red-500 text-sm text-center">{error}</div>}
                <button
                    className="w-full py-2 px-4 bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded disabled:bg-gray-400 disabled:cursor-not-allowed"
                    type="submit"
                    disabled={!stripe || !clientSecret}
                >
                    Pay
                </button>

                {
                    transactionId && <p className='text-green-500 '> Your TRX ID: {transactionId}</p>
                }
            </form>
        </div>
    );
};

export default CheckOutForm;
