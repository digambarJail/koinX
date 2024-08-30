import axios from 'axios';
import { User } from '../models/transactions.js';
import { Prices } from '../models/ethereumPrices.js';

// Fetch and store transactions for a given Ethereum address
const getTransactions = async (req, res) => {
    try {
        // Extract Ethereum address from request parameters
        const { address } = req.params;
        
        // Define the Etherscan API URL to fetch transactions for the given address
        const url = `https://api.etherscan.io/api?module=account&action=txlist&address=${address}&startblock=0&endblock=99999999&page=1&offset=10&sort=asc&apikey=YD69YUCPU56KPQTCZFFEEIGG2DU62FGWAZ`;

        // Make a GET request to the Etherscan API
        const response = await axios.get(url);

        // Check if the response contains transaction data
        if (response.data && response.data.result) {
            const transactions = response.data.result;

            // Save or update the transactions in the database
            const user = await User.findOneAndUpdate(
                { address },
                { address, transactions },
                { new: true, upsert: true }
            );

            // Send a success response with the stored user data
            res.status(200).json({ message: "Transactions fetched and stored successfully", user });
        } else {
            // Handle case where no transaction data is returned
            res.status(400).json({ message: "Failed to fetch transactions from Etherscan" });
        }
    } catch (error) {
        // Log and send an error response if the API request or database operation fails
        console.error("Error fetching transactions", error);
        res.status(500).json({ message: "An error occurred", error: error.message });
    }
};

// Calculate and return the total expenses based on Ethereum transactions
const getExpenses = async (req, res) => {
    try {
        // Extract Ethereum address from request parameters
        const { address } = req.params;
        
        // Define the Etherscan API URL to fetch transactions for the given address
        const url = `https://api.etherscan.io/api?module=account&action=txlist&address=${address}&startblock=0&endblock=99999999&page=1&offset=10&sort=asc&apikey=YD69YUCPU56KPQTCZFFEEIGG2DU62FGWAZ`;

        // Make a GET request to the Etherscan API
        const response = await axios.get(url);
        const transactions = response.data.result;

        // Calculate total expenses based on gas costs from transactions
        let totalExpense = 0;
        transactions.forEach(transaction => {
            const gasPrice = parseFloat(transaction.gasPrice);
            const gasUsed = parseFloat(transaction.gasUsed);

            // Calculate gas cost and add to total expense
            const gasCost = (gasPrice * gasUsed) / Math.pow(10, 18);
            totalExpense += gasCost;
        });

        // Log and return the total expenses
        console.log("Total Expenses", totalExpense);
        res.status(200).json({ message: `Total Expenses ${totalExpense}` });
    } catch (error) {
        // Log and send an error response if the API request fails
        console.error("Error fetching transactions", error);
        res.status(500).json({ message: "An error occurred", error: error.message });
    }

    try {
        // Fetch the current price of Ethereum in INR from CoinGecko API
        const response = await axios.get('https://api.coingecko.com/api/v3/simple/price?ids=ethereum&vs_currencies=inr');
        const inr = response.data.ethereum.inr;

        // Log and return the fetched price
        console.log("Price fetched successfully", inr);
        res.status(200).json({ message: `Ether Price ${inr}` });
    } catch (error) {
        // Log and send an error response if the API request fails
        console.error('Error fetching data:', error.message);
        res.status(500).json({ message: "An error occurred", error: error.message });
    }
}

export { getTransactions, getExpenses };
