import mongoose, { Schema } from "mongoose";
import Config from "../config"

const productType = new Schema({
    name: {
        type: String, trim: true, required: true, enum: [
            Config.APP_CONSTANTS.DATABASE.PRODUCT_TYPES.TYPE1,
            Config.APP_CONSTANTS.DATABASE.PRODUCT_TYPES.TYPE2,
            Config.APP_CONSTANTS.DATABASE.PRODUCT_TYPES.TYPE3,
        ], unique: true
    },
    description: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date },
    isBlocked: { type: Boolean, default: false, required: true }
});

export default mongoose.model("productType", productType);
