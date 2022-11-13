import mongoose, { Schema } from "mongoose";

var cardDetails = new Schema({
    cardNumber: { type: Number },
    cardType: { type: String },
    cardId: { type: String, trim: true },
    expiryMonth: { type: Number },
    expiryYear: { type: Number }
  })

const transaction = new Schema({
    productId: { type: Schema.Types.ObjectId, ref: 'product', required: true },
    sellerKycApproved: { type: Boolean, default: false, required: true },
    buyerKycApproved: { type: Boolean, default: false, required: true },
    sellerKycAmount: {
        amount: {type: Number},
        cardDetails: {type: cardDetails},
        paymentStatus: {type: String, enum:["PENDING","COMPLETED"]}
    },
    sellerKycDocument: {type: String},
    buyerKycAmount: {
        amount: {type: Number},
        cardDetails: {type: cardDetails},
        paymentStatus: {type: String, enum:["PENDING","COMPLETED"]}
    },
    buyerKycDocument: {type: String},
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date },
    additionalDocuments: [{
        name: {type: String},
        link: {type: String}
    }]
});

export default mongoose.model("transaction", transaction);
