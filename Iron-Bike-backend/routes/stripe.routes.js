const router = require('express').Router();
const KEY = process.env.STRIPE_KEY;
const stripe = require('stripe')(KEY);
const { isAuthenticated } = require('../middleware/jwt.middleware');

router.post('/payment', (req, res) => {
  stripe.charges.create(
    {
      source: req.body.tokenId,
      amount: req.body.amount,
      currency: 'eur',
    },
    (stripeErr, stripeRes) => {
      if (stripeErr) {
        console.log(stripeErr, 'stripe response erreur');

        res.status(500).json(stripeErr);
      } else {
        console.log(stripeRes, 'stripe response ok');
        res.status(200).json(stripeRes);
      }
    }
  );
});

module.exports = router;
