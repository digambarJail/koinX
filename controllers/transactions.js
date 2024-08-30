import axios from 'axios';
import { User } from '../models/transactions.js';
import { Prices } from '../models/ethereumPrices.js';

// Fetch transactions
const getTransactions = async (req, res) => {
    try {
        const { address } = req.params;
        const url = `https://api.etherscan.io/api?module=account&action=txlist&address=${address}&startblock=0&endblock=99999999&page=1&offset=10&sort=asc&apikey=YD69YUCPU56KPQTCZFFEEIGG2DU62FGWAZ`;

        // Make the GET request to the Etherscan API
        const response = await axios.get(url);
        if (response.data && response.data.result) {
            const transactions = response.data.result;

            // Save transactions in the database
            const user = await User.findOneAndUpdate(
                { address },
                { address, transactions },
                { new: true, upsert: true }
            );

            res.status(200).json({ message: "Transactions fetched and stored successfully", user });
        } else {
            res.status(400).json({ message: "Failed to fetch transactions from Etherscan" });
        }
    } catch (error) {
        console.error("Error fetching transactions", error);
        res.status(500).json({ message: "An error occurred", error: error.message });
    }
};

const getExpenses = async (req,res) =>{
    
    try {
        const { address } = req.params;
        const url = `https://api.etherscan.io/api?module=account&action=txlist&address=${address}&startblock=0&endblock=99999999&page=1&offset=10&sort=asc&apikey=YD69YUCPU56KPQTCZFFEEIGG2DU62FGWAZ`;

        // Make the GET request to the Etherscan API
        const response = await axios.get(url);

        const transactions = response.data.result;

        let totalExpense = 0;
        transactions.forEach(transaction => {
            const gasPrice = parseFloat(transaction.gasPrice);
            const gasUsed = parseFloat(transaction.gasUsed);

            const gasCost = (gasPrice * gasUsed) / Math.pow(10, 18);
            totalExpense += gasCost;
        });


        console.log("Total Expenses",totalExpense)

        res.status(200).json({message:`Total Expenses ${totalExpense}`})

    } catch (error) {
        console.error("Error fetching transactions", error);
        res.status(500).json({ message: "An error occurred", error: error.message });
    }

    try {
        const response = await axios.get('https://api.coingecko.com/api/v3/simple/price?ids=ethereum&vs_currencies=inr');
        const inr = response.data.ethereum.inr;

        console.log("Price fetched successfully",inr);

        res.status(200).json({message:`Ether Price ${inr}`})
    } catch (error) {
        console.error('Error fetching data:', error.message);
        res.status(500).json({ message: "An error occurred", error: error.message });

    }
}

export { getTransactions,getExpenses };
