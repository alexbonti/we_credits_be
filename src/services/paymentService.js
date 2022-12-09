const universalFunctions = require("../utils/universalFunctions");
const config = require("../config");
const stripe = require("stripe")(process.env.STRIPE_KEY);

const createStripeCustomer = function (payloadData, callback) {
  stripe.customers.create(
    {
      name: payloadData.first_name + " " + payloadData.last_name,
      email: payloadData.emailId
    },
    callback
  );
};

const addPaymentMethod = function (payloadData, callback) {
  stripe.paymentMethods.attach(
    payloadData.cardSource,
    {
      customer: payloadData.customerId,
    },
    callback
  );
};

const addStripeCard = function (payloadData, callback) {
  stripe.customers.createSource(
    payloadData.customerId,
    {
      source: payloadData.cardSource,
    },
    callback
  );
};

const createCharge = function (payloadData, callback) {
  stripe.paymentIntents.create(
    {
      amount: payloadData.amount * 100,
      currency: "EUR",
      payment_method_types: ["card"],
      customer: payloadData.customerId,
      payment_method: payloadData.paymentMethodId
    },
    callback
  );
};

const confirmCharge = function (payloadData, callback) {
  stripe.paymentIntents.confirm(
    payloadData.paymenIntentId,
    callback
  );
};

export default {
  createStripeCustomer: createStripeCustomer,
  addPaymentMethod: addPaymentMethod,
  addStripeCard: addStripeCard,
  createCharge: createCharge,
  confirmCharge: confirmCharge,
};