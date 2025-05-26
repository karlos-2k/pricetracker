"use server"

import { scrapeAmazonProduct } from "../scraper";

// all code written will run here 

export async function scrapeAndStoreProduct(productUrl: string) {
    if(!productUrl) {
        throw new Error("Product URL is required");
    }

    try {
        const scrapedProduct = await scrapeAmazonProduct(productUrl);
        if(!scrapedProduct) throw new Error("Failed to scrape product");
        
        return scrapedProduct;
    } catch(error: any) {
        throw new Error(`Error scraping product: ${error.message}`);
    }
}