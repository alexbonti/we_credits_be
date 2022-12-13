import mongoose, { Schema } from "mongoose";
import Config from "../config";

var cardDetails = new Schema({
    cardNumber: { type: Number },
    cardType: { type: String },
    cardId: { type: String, trim: true },
    expiryMonth: { type: Number },
    expiryYear: { type: Number }
})

const product = new Schema({
    userId: { type: Schema.Types.ObjectId, ref: 'user', required: true },
    name: { type: String, trim: true, required: true },
    description: { type: String, required: true },
    type: { type: Schema.Types.ObjectId, ref: 'productType', required: true },
    sellValue: { type: Number, required: true },
    originalValue: { type: Number, required: true },
    expiryDate: { type: Date },
    onMarket: { type: Boolean, default: false, required: true },
    status: {
        type: String, enum: [
            Config.APP_CONSTANTS.DATABASE.PRODUCT_STATUS.PENDING,
            Config.APP_CONSTANTS.DATABASE.PRODUCT_STATUS.AVAILABLE,
            Config.APP_CONSTANTS.DATABASE.PRODUCT_STATUS.PROCESSING,
            Config.APP_CONSTANTS.DATABASE.PRODUCT_STATUS.ADMIN_APPROVAL,
            Config.APP_CONSTANTS.DATABASE.PRODUCT_STATUS.COMPLETED
        ], default: Config.APP_CONSTANTS.DATABASE.PRODUCT_STATUS.PENDING
    },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date },
    isBlocked: { type: Boolean, default: false, required: true },
    sellerKyc: {
        kycTransaction: {
            amount: { type: Number },
            cardDetails: { type: cardDetails },
            stripeTransactionId: { type: String },
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
        ibanNumber: { type: Number },
        documentUrl: { type: String },
        adminApproved: { type: Boolean, default: false, required: true },
        kycSignature: { type: String },
        createdAt: { type: Date, default: Date.now }
    },
    activeTransaction: { type: Schema.Types.ObjectId, ref: 'transaction' },
    pastTransaction: [{ type: Schema.Types.ObjectId, ref: 'transaction' }]
});

export default mongoose.model("product", product);
