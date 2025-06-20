"use server"

import { revalidatePath } from "next/cache";
import Product from "../models/product.model";
import { connectToDB } from "../mongoose";
import { scrapeAmazonProduct } from "../scraper";
import { getLowestPrice, getHighestPrice, getAveragePrice } from "../utils";
import mongoose from "mongoose";
import { generateEmailBody, sendEmail } from "../nodemailer";

// all code written will run here 
export async function scrapeAndStoreProduct(productUrl: string) {
    if(!productUrl) {
        throw new Error("Product URL is required");
    }

    try {
        // Validate URL format
        const parsedURL = new URL(productUrl);
        if (!parsedURL.hostname.includes('amazon')) {
            throw new Error('Please provide a valid Amazon product URL');
        }

        // Connect to database
        try {
            await connectToDB();
        } catch (error) {
            console.error('Database connection failed:', error);
            throw new Error('Failed to connect to database. Please try again.');
        }
        
        // Scrape product
        const scrapedProduct = await scrapeAmazonProduct(productUrl);
        if (!scrapedProduct) {
            throw new Error('Failed to scrape product data');
        }

        // Validate scraped data
        if (!scrapedProduct.title || !scrapedProduct.currentPrice || !scrapedProduct.image) {
            console.error('Invalid product data:', scrapedProduct);
            throw new Error('Failed to extract product information. Please try a different product.');
        }
        
        let product = scrapedProduct;

        const existingProduct = await Product.findOne({url: scrapedProduct.url});

        if(existingProduct) {
            // Update price history
            const updatedPriceHistory = [
                ...existingProduct.priceHistory,
                { price: scrapedProduct.currentPrice, date: new Date() }
            ];

            // Calculate new price metrics
            const lowestPrice = getLowestPrice(updatedPriceHistory);
            const highestPrice = getHighestPrice(updatedPriceHistory);
            const averagePrice = getAveragePrice(updatedPriceHistory);

            product = {
                ...scrapedProduct,
                priceHistory: updatedPriceHistory,
                lowestPrice,
                highestPrice,
                averagePrice,
                reviewsCount: scrapedProduct.reviewsCount || existingProduct.reviewsCount,
                image: scrapedProduct.image || existingProduct.image,
                discountRate: scrapedProduct.discountRate || existingProduct.discountRate,
                isOutOfStock: scrapedProduct.isOutOfStock
            };
        } else {
            // For new products, set initial price metrics
            product = {
                ...scrapedProduct,
                lowestPrice: scrapedProduct.currentPrice,
                highestPrice: scrapedProduct.currentPrice,
                averagePrice: scrapedProduct.currentPrice,
                priceHistory: [
                    {
                        price: scrapedProduct.currentPrice,
                    }
                ]
            };
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
        return {
            ...JSON.parse(JSON.stringify(newProduct)),
            reviewsCount: newProduct.reviewsCount,
            currentPrice: newProduct.currentPrice
        };

    } catch(error: any) {
        throw new Error(`Error scraping product: ${error.message}`)
    }
}

//this allows us to get all products from database and get back to our details page
export async function getProductById(productId: string) {
    try {
        await connectToDB();
        
        const product = await Product.findOne({ _id: productId });
        
        if (!product) {
            console.log(`No product found with ID: ${productId}`);
            return null;
        }
        
        return JSON.parse(JSON.stringify(product));
    } catch (error: any) {
        console.error('Error in getProductById:', error);
        throw new Error(`Failed to get product: ${error.message}`);
    }
}

export async function getSimilarProducts(productId: string) {
    try {
        await connectToDB();

        const currentProduct = await Product.findById(productId);
        
        if (!currentProduct) {
            console.log(`No product found with ID: ${productId}`);
            return null;
        }

        const similarProducts = await Product.find({
            _id: { $ne: productId },
            category: currentProduct.category // Match products in the same category
        })
        .limit(3)
        .lean(); // Use lean() for better performance

        return JSON.parse(JSON.stringify(similarProducts));
    } catch (error: any) {
        console.error('Error in getSimilarProducts:', error);
        throw new Error(`Failed to get similar products: ${error.message}`);
    }
}
export async function addUserEmailToProduct(
    productId: string,
    userEmail: string
) {
    try {
        const product = await Product.findById(productId);

        if (!product) return;

        const userExists = product.users.some((user: any) => user.email === userEmail);  // Check if user already exists

        if(!userExists){
            product.users.push({
                email: userEmail,
            });

            await product.save();  // Save the updated product

            const emailContent = await generateEmailBody(product, "WELCOME");

            await sendEmail(await emailContent, [userEmail]);  // Send welcome email
        }
    }catch(error: any) {
        console.log(error);
    }
}

export async function getAllProducts() {
    try {
        connectToDB();
        const products = await Product.find();
        
        return products;
    }catch(error: any) {
        console.log(error);
    }
}