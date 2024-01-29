const Stripe = require("stripe")

const stripe = Stripe(process.env.STRIPE_SECRET_KEEY)

const createPayment = async () =>{
    try {
        const {amount,email,phone} = req.body
        const paymentIntent = await stripe.paymentIntents.create({
            amount:Math.round(amount),
            currency: "KES",
            payment_method_types:["card"],
            metadata:{email,phone,amount}
        })
        const clientSecret = paymentIntent.client_secret;

        res.json({message:"Payment initiated",clientSecret})
    } catch (error) {
        console.error({message:"Internal server error"})
    }
}



module.exports = {createPayment}