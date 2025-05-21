"use server"

import { scrapeAmazonProduct } from "../scraper";

// all code written will run here 

export async function scrapeAndStoreProduct(productUrl: string){
    if(!productUrl) return;

    try{
        const scrapedProduct = await scrapeAmazonProduct(productUrl);
    } catch(error: any){
        throw new Error(`Error scraping product: ${error.message}`);
    }
}