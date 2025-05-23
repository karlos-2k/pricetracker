import axios from "axios";
import * as cheerio from "cheerio";
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

export async function scrapeAmazonProduct(url: string) {
    if(!url) return;

    // BrightData proxy configuration
    const username = process.env.BRIGHTDATA_USERNAME;
    const password = process.env.BRIGHTDATA_PASSWORD;

    // Validate credentials
    if (!username || !password) {
        throw new Error('Brightdata credentials are required');
    }

    const port = 33335;
    const session_id = (1000000 * Math.random()) | 0;

    const options = {
        auth: {
            username: `${username}-session-${session_id}`,
            password,
        },
        host: 'api.brightdata.com',
        port,
        rejectUnauthorized: false,
    }

    try {
        // fetch the product page
        const response = await axios.get(url, options);
        console.log(response.data);
    } catch(error: any) {
        throw new Error(`Failed to scrape product: ${error.message}`);
    }
}