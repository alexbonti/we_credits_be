import mongoose, { Schema } from "mongoose";
import Config from "../config";

const product = new Schema({
    userId: { type: Schema.Types.ObjectId, ref: 'user', required: true },
    name: { type: String, trim: true, required: true },
    description: { type: String, required: true},
    type: { type: Schema.Types.ObjectId, ref: 'productType', required: true },
    sellValue: { type: Number, required: true},
    originalValue: { type: Number, required: true},
    expiryDate: { type: Date },
    onMarket: { type: Boolean, default: false, required: true },
    status: { type: String, enum: [
        Config.APP_CONSTANTS.DATABASE.PRODUCT_STATUS.PENDING,
        Config.APP_CONSTANTS.DATABASE.PRODUCT_STATUS.AVAILABLE,
        Config.APP_CONSTANTS.DATABASE.PRODUCT_STATUS.PROCESSING,
        Config.APP_CONSTANTS.DATABASE.PRODUCT_STATUS.COMPLETED
    ],default: Config.APP_CONSTANTS.DATABASE.PRODUCT_STATUS.PENDING},
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date },
    isBlocked: { type: Boolean, default: false, required: true },
    buyerId: { type: Schema.Types.ObjectId, ref: 'users' },
    transaction : {type: Schema.Types.ObjectId, ref: 'transaction'}
});

export default mongoose.model("product", product);
