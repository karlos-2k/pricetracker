import { PriceHistoryItem, Product } from "../types";

const Notification = {
  WELCOME: 'WELCOME',
  CHANGE_OF_STOCK: 'CHANGE_OF_STOCK',
  LOWEST_PRICE: 'LOWEST_PRICE',
  THRESHOLD_MET: 'THRESHOLD_MET',
}

const THRESHOLD_PERCENTAGE = 40;

// Extracts and returns the price from a list of possible elements.
export function extractPrice(...elements: any) {
  for (const element of elements) {
    if (!element) continue;

    const priceText = element.text().trim();

    if(priceText) {
      // Remove any non-digit, non-decimal, non-comma characters
      const cleanPrice = priceText.replace(/[^\d.,]/g, '');
      
      // Handle prices with commas (e.g. 1,234.56)
      const withoutCommas = cleanPrice.replace(/,/g, '');
      
      // Try to match a valid price format (e.g. 123.45)
      const match = withoutCommas.match(/^\d+\.?\d{0,2}$/);
      
      if (match) {
        const price = parseFloat(match[0]);
        if (!isNaN(price) && price > 0) {
          return price.toFixed(2);
        }
      }
    }
  }

  return '0.00';
}

// Extracts and returns the currency symbol from an element.
export function extractCurrency(element: any) {
  const currencyText = element.text().trim().slice(0, 1);
  return currencyText ? currencyText : "";
}

// Extracts description from two possible elements from amazon
export function extractDescription($: any) {
  // these are possible elements holding description of the product
  const selectors = [
    ".a-unordered-list .a-list-item",
    ".a-expander-content p",
    // Add more selectors here if needed
  ];

  for (const selector of selectors) {
    const elements = $(selector);
    if (elements.length > 0) {
      const textContent = elements
        .map((_: any, element: any) => $(element).text().trim())
        .get()
        .join("\n");
      return textContent;
    }
  }

  // If no matching elements were found, return an empty string
  return "";
}

export function getHighestPrice(priceList: PriceHistoryItem[]) {
  if (!priceList || priceList.length === 0) return 0;

  return Math.max(...priceList.map(item => Number(item.price) || 0));
}

export function getLowestPrice(priceList: PriceHistoryItem[]) {
  if (!priceList || priceList.length === 0) return 0;

  const validPrices = priceList
    .map(item => Number(item.price))
    .filter(price => !isNaN(price) && price > 0);

  return validPrices.length > 0 ? Math.min(...validPrices) : 0;
}

export function getAveragePrice(priceList: PriceHistoryItem[]) {
  if (!priceList || priceList.length === 0) return 0;

  const validPrices = priceList
    .map(item => Number(item.price))
    .filter(price => !isNaN(price) && price > 0);

  if (validPrices.length === 0) return 0;

  const sum = validPrices.reduce((acc, curr) => acc + curr, 0);
  return Number((sum / validPrices.length).toFixed(2));
}

export const getEmailNotifType = (
  scrapedProduct: Product,
  currentProduct: Product
) => {
  const lowestPrice = getLowestPrice(currentProduct.priceHistory);

  if (scrapedProduct.currentPrice < lowestPrice) {
    return Notification.LOWEST_PRICE as keyof typeof Notification;
  }
  if (!scrapedProduct.isOutOfStock && currentProduct.isOutOfStock) {
    return Notification.CHANGE_OF_STOCK as keyof typeof Notification;
  }
  if (scrapedProduct.discountRate >= THRESHOLD_PERCENTAGE) {
    return Notification.THRESHOLD_MET as keyof typeof Notification;
  }

  return null;
};

export const formatNumber = (num: number = 0) => {
  return num.toLocaleString(undefined, {
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  });
};