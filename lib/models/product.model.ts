// create a schema for the product
import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
    url: { type: String, required: true, unique: true},
    currentPrice: { type: Number, required: true},
    originalPrice: { type: Number, required: true},
    priceHistory: [{
        price: { type: Number, required: true},
        date: { type: Date, default: Date.now},
    }],
    currency: { type: String, required: true},
    image: { type: String, required: true},
    title: { type: String, required: true},
    category: {type: String },
    description: { type: String },
    users: [{
        email: { type: String, required: true},
    }],
    createdAt: { type: Date, default: Date.now},
    updatedAt: { type: Date, default: Date.now},
    lowestPrice: { type: Number },
    highestPrice: { type: Number },
    averagePrice: { type: Number },
    discountRate: { type: Number },
    stars: { type: Number },
    outOfStock: { type: Boolean, default: false},
}, { timestamps: true});

// turn schema into a model
const Product = mongoose.models.Product || mongoose.model('Product',productSchema); // if the model already exists, use it, otherwise create a new one

export default Product;
