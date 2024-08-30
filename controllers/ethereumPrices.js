import axios from 'axios';
import { Prices } from '../models/ethereumPrices.js';

// Function to fetch Ethereum prices from CoinGecko API and store them in the database
const fetchAndStoreEthereumPrices = async () => {
    try {
        // Make a GET request to the CoinGecko API to fetch Ethereum price in INR
        const response = await axios.get('https://api.coingecko.com/api/v3/simple/price?ids=ethereum&vs_currencies=inr');
        
        // Extract the price in INR from the response data
        const inr = response.data.ethereum.inr;

        // Create a new instance of Prices model with the fetched price
        const price = new Prices({ inr });

        // Save the price instance to the database
        await price.save();

        console.log("Price fetched and stored successfully"); // Log success message
    } catch (error) {
        // Log any errors encountered during the API request or database operation
        console.error('Error fetching data:', error.message);
    }
};

// Schedule the fetchAndStoreEthereumPrices function to run every 10 minutes
const interval = 1000 * 60 * 10; // 10 minutes in milliseconds
setInterval(fetchAndStoreEthereumPrices, interval);

// Export the fetchAndStoreEthereumPrices function for use in other modules
export { fetchAndStoreEthereumPrices };
