import axios from 'axios';
import { Prices } from '../models/ethereumPrices.js';

// Fetch and store Ethereum prices
const fetchAndStoreEthereumPrices = async () => {
    try {
        const response = await axios.get('https://api.coingecko.com/api/v3/simple/price?ids=ethereum&vs_currencies=inr');
        const inr = response.data.ethereum.inr;

        const price = new Prices({ inr });
        await price.save();

        console.log("Price fetched and stored successfully");
    } catch (error) {
        console.error('Error fetching data:', error.message);
    }
};

// Schedule price fetching every 5 minutes
const interval = 1000 * 60 * 10; // 5 minutes
setInterval(fetchAndStoreEthereumPrices, interval);

export { fetchAndStoreEthereumPrices };
