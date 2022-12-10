import mongoose, { Schema } from "mongoose";
import Config from "../config";

var cardDetails = new Schema({
    cardNumber: { type: Number },
    cardType: { type: String },
    cardId: { type: String, trim: true },
    expiryMonth: { type: Number },
    expiryYear: { type: Number }
})

const transaction = new Schema({
    productId: { type: Schema.Types.ObjectId, ref: 'product', required: true },
    buyerId: { type: Schema.Types.ObjectId, ref: 'user' },
    buyerKyc: {
        kycTransaction: {
            amount: { type: Number },
            cardDetails: { type: cardDetails },
            stripertransactionId: { type: String },
            paymentStatus: { type: String, enum: ["PENDING", "COMPLETED"] }
        },
        sectionA: {
            a1: { type: String },
            a2: { type: Number },
            a3: { type: String },
            a4: { type: String },
            a5: { type: Boolean },
            a6: { type: String },
            a7: { type: Boolean },
        },
        cassetteNumber: { type: Number },
        documentUrl: { type: String },
        adminApproved: { type: Boolean, default: false, required: true },
        kycSignature: { type: String },
        createdAt: { type: Date, default: Date.now }
    },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date },
    additionalDocuments: [{
        name: { type: String },
        link: { type: String },
        userId: { type: Schema.Types.ObjectId, ref: 'user' }
    }],
    status: {
        type: String, enum: [
            Config.APP_CONSTANTS.DATABASE.PRODUCT_STATUS.PENDING,
            Config.APP_CONSTANTS.DATABASE.PRODUCT_STATUS.PROCESSING,
            Config.APP_CONSTANTS.DATABASE.PRODUCT_STATUS.ADMIN_APPROVAL,
            Config.APP_CONSTANTS.DATABASE.PRODUCT_STATUS.COMPLETED,
            Config.APP_CONSTANTS.DATABASE.PRODUCT_STATUS.CANCELLED
        ], default: Config.APP_CONSTANTS.DATABASE.PRODUCT_STATUS.PENDING
    },
});

export default mongoose.model("transaction", transaction);
