import React from 'react';
import StripeCheckout from 'react-stripe-checkout';


const StripeCheckoutButton = ({ price, userid,tripId }) => {
    price = parseInt(price);
    const priceForStripe = price * 100;
    const publishableKey = 'pk_test_51HoFgjCxgtcfoZwvsKFbfVjfG9zEtZV8SlBCIQ9gziIN1dFFj5WbV4vgjHGQslUdfoenn0j5bGqHu9fwKBVb8WvB0077gk8H7w'

    const onToken = token => {
        console.log('token in stripe: ', token)
        fetch('/payment', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                amount: priceForStripe,//priceForStripe,
                token,
                userid,//userid
                tripId
            })
        })
            .then(response => response.json())
            .then(data => {
                console.log('Success:', data);
                alert('Payment Successful');
            })
            .catch(err => {
                console.log('Payment error: ', err)
                alert('Payment Not Successful')
            })


    }
    return (
        <StripeCheckout
            label='Pay Now'
            name='Laflefni Ltd.'
            billingAddress
            shippingAddress
            image='https://svgshare.com/i/CUz.svg'
            description={`your total is $${price}`}
            amount={priceForStripe}
            panelLabel='Pay Now'
            token={onToken}
            stripeKey={publishableKey}
        />
    )
}

export default StripeCheckoutButton;
