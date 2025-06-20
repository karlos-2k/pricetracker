import axios from "axios";
import * as cheerio from "cheerio";
import { BRIGHTDATA_USERNAME, BRIGHTDATA_PASSWORD } from "../config";
import { extractCurrency, extractDescription, extractPrice } from "../utils";

export async function scrapeAmazonProduct(url: string) {
    if(!url) {
        throw new Error('URL is required');
    }

    // Validate BrightData credentials
    if(!BRIGHTDATA_USERNAME || !BRIGHTDATA_PASSWORD) {
        throw new Error('BrightData credentials are not configured');
    }

    const username = BRIGHTDATA_USERNAME;
    const password = BRIGHTDATA_PASSWORD;
    const port = 22225;
    const session_id = (1000000 * Math.random()) | 0;

    const options = {
        auth: {
            username: `${username}-session-${session_id}`,
            password,
        },
        host: 'brd.superproxy.io', // Updated to correct hostname
        port,
        rejectUnauthorized: false,
        timeout: 30000, // 30 second timeout
        headers: {
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/121.0.0.0 Safari/537.36'
        }
    }

    try {
        // Fetch the product page
        const response = await axios.get(url, options);
        
        // Validate the response
        if (response.status !== 200) {
            throw new Error(`Failed to get success response. Status: ${response.status}`);
        }

        // Validate we got HTML content
        const contentType = response.headers['content-type'];
        if (!contentType || !contentType.includes('text/html')) {
            throw new Error('Failed to get HTML content from the page');
        }

        // Load the response data into cheerio
        const $ = cheerio.load(response.data);
        
        // Validate we got some content
        if (!$('body').length) {
            throw new Error('Failed to parse page content');
        }

        // Extract the product title
        const title = $('#productTitle').text().trim();

        // Extract current price - trying multiple selectors
        const priceElements = [
            $('.priceToPay span.a-price-whole'),
            $('.a.size.base.a-color-price'),
            $('.a-button-selected .a-color-base'),
            $('.a-price.a-text-price span.a-offscreen'),
            $('#priceblock_ourprice'),
            $('#priceblock_dealprice'),
            $('.a-price .a-offscreen')
        ];

        const currentPrice = extractPrice(...priceElements);

        const originalPrice = extractPrice(
            $('#priceblock_ourprice'),
            $('.a-price.a-text-price span.a-offscreen'),
            $('#listPrice'),
            $('#priceblock_dealprice'),
            $('.a-size-base.a-color-price'),
            // $('.aok-relative span.a-offscreen'),
            // $('.aok-relative .a-price.a-text-price span.a-offscreen')
        );

        const outOfStock = $('#availability span').text().trim().toLowerCase() === 'currently unavailable';
        
        const image = $('#landingImage').attr('data-a-dynamic-image') || 
        $('#imgBlkFront').attr('data-a-dynamic-image');
        
        const imageUrls = Object.keys(JSON.parse(image || '{}'));

        const currency = extractCurrency($('.a-price-symbol'));

        // extract discount rate and removing % sign
        const discountRate = $('.savingsPercentage').text().replace(/[-%]/g, '');

        const description = extractDescription($);

        const reviewsCount = $('#acrCustomerReviewText').text().trim();        // Ensure we have valid data before creating the product
        if (!title || !currentPrice || !imageUrls.length) {
            throw new Error('Failed to extract essential product data');
        }

        // Create the product data object with proper defaults
        const productData = {
            url,
            title,
            currentPrice: Number(currentPrice),
            originalPrice: Number(originalPrice) || Number(currentPrice),
            priceHistory: [{ price: Number(currentPrice) }],
            image: imageUrls[0],  // Use the first image URL
            currency: currency || '$',
            discountRate: Number(discountRate) || 0,
            category: 'General',  // Default category
            reviewsCount: parseInt(reviewsCount) || 0,
            stars: 0,  // Default value
            isOutOfStock: outOfStock,
            description: description || '',
            lowestPrice: Number(currentPrice),
            highestPrice: Number(originalPrice) || Number(currentPrice),
            averagePrice: Number(currentPrice),

        };

        console.log('Scraped Product Data:', productData);
        return productData;

    } catch(error: any) {
        console.error('Scraping error details:', {
            message: error.message,
            status: error.response?.status,
            statusText: error.response?.statusText,
            headers: error.response?.headers
        });
        throw new Error(`Failed to scrape product: ${error.message}`);
    }
}