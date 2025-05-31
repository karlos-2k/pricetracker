// Function to extract and clean price from various elements
export const extractPrice = (...elements: any) => {
    for (const element of elements) {
        const priceText = element.text().trim();

        if(priceText) return priceText.replace(/[^\d.]/g, '');
    }

    return '';
}