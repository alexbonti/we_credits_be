const universalFunctions = require("../utils/universalFunctions");
const config = require("../config");
const stripe = require("stripe")(process.env.STRIPE_KEY);

const createStripeCustomer = function(payloadData, callback) {
  stripe.customers.create(
    {
      name: payloadData.first_name + " " + payloadData.last_name,
      email: payloadData.emailId
    },
    callback
  );
};

const addStripeCard = function(payloadData, callback) {
  stripe.customers.createSource(
    payloadData.customerId,
    {
      source: payloadData.cardSource,
    },
    callback
  );
};

const createCharge = function(payloadData, callback) {
    stripe.charges.create({
        amount: payloadData.amount*100,
        currency: payloadData.currency,
        capture: true,
        customer: payloadData.customerId,
        source: payloadData.cardSource
    },callback)
};

export default {
  createStripeCustomer: createStripeCustomer,
  addStripeCard: addStripeCard,
  createCharge: createCharge
};