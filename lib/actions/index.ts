"use server"

import { revalidatePath } from "next/cache";
import Product from "../models/product.model";
import { connectToDB } from "../mongoose";
import { scrapeAmazonProduct } from "../scraper";
import { getLowestPrice, getHighestPrice, getAveragePrice } from "../utils";

// all code written will run here 

export async function scrapeAndStoreProduct(productUrl: string) {
    if(!productUrl) {
        throw new Error("Product URL is required");
    }

    try {
        await connectToDB();  // ensure we await the connection
        
        const scrapedProduct = await scrapeAmazonProduct(productUrl);
        if(!scrapedProduct) throw new Error("Failed to scrape product");
        
        let product = scrapedProduct;  // create a product object

        const existingProduct = await Product.findOne({url: scrapedProduct.url});  // check if the product already exists

        if(existingProduct) {
            const updatedPriceHistory: any = [
                ...existingProduct.priceHistory,   // spread the existing price history
                { price: scrapedProduct.currentPrice},  // add the new price
            ]

            product = {
                ...scrapedProduct,
                priceHistory: updatedPriceHistory,
                lowestPrice: getLowestPrice(updatedPriceHistory),
                highestPrice: getHighestPrice(updatedPriceHistory),
                averagePrice: getAveragePrice(updatedPriceHistory),
            }
        }

        const newProduct = await Product.findOneAndUpdate(
            { url: scrapedProduct.url },  // update the product
            product,    // update the product with the new product
            { upsert: true, new: true }
        ) as any;  // temporary type assertion to fix the error
        
        if (newProduct) {
            revalidatePath(`/products/${newProduct._id}`);     // revalidate the product page
        }

        // Convert Mongoose document to plain JavaScript object
        return JSON.parse(JSON.stringify(newProduct));

    } catch(error: any) {
        throw new Error(`Error scraping product: ${error.message}`)
    }
}