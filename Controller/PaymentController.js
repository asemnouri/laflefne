//requiring the payment schema
const { Payment } = require('../DataModel')
//requiring the trips schema
const trips = require("../DataModel").trips
const users = require("../DataModel").users
if (process.env.NODE_ENV !== 'production') require('dotenv').config();
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
exports.payment = (req, res) => {
    var objToRet;
    console.log('reached ********************************')
    console.log(req.body.token.id)
    console.log(' ********************************')
    console.log(req.body.amount)
    console.log(' ****************ffffffffffffffffffffffffffjjjjjjjjjjjjjjjjjjjjjjj****************')
    console.log("user id is here", req.body.userid)
    const body = {
        source: req.body.token.id,
        amount: req.body.amount,
        currency: 'usd'
    }
    stripe.charges.create(body, (stripeErr, stripeRes) => {
        console.log(stripeRes)
        console.log(stripeErr)
        if (stripeErr) res.status(500).send({ error: stripeErr })
        else {
            let paymentR = new Payment({
                amount: stripeRes.amount / 100,
                userid: req.body.userid,
                city: stripeRes.billing_details.address.city,
                country: stripeRes.billing_details.address.country,
                lin1: stripeRes.billing_details.address.line1,
                lin2: stripeRes.billing_details.address.line2,
                last4: stripeRes.payment_method_details.card.last4,
                exp_year: stripeRes.source.exp_year,
                exp_month: stripeRes.source.exp_month
            })
            paymentR.save()
                .then(async (obj) => {
                    objToRet = obj
                    //get the user and add the trip to his array
                    //get the trip and add the user to its idOfTourist
                    let email = ""
                    await users.findOne({ _id: req.body.userid }, (err, user) => {
                        let res = user.trips.push(req.body.tripId)
                        email = user.email
                        user.updateOne({ trips: res })
                            .then(data => console.log(data))
                            .catch(err => console.log(err))
                    })

                    await trips.findOne({ _id: req.body.tripId }, (err, trip) => {
                        let res = trip.idOfTourist.push(email)
                        trip.updateOne({ idOfTourist: res })
                            .then(data => console.log(data))
                            .catch(err => console.log(err))
                    })
                    //make it for the last then 
                    res.status(200).send({ success: stripeRes, payment_record: obj })
                })
                .catch((err) => {
                    console.log(err)
                    res.status(200).send({ success: stripeRes, payment_record: 'payment successful but not saved in user payments ' })
                })
        }
    })
}
exports.check = (req, res) => { return (req.user) }