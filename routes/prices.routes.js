import express from 'express';
import ethereumPricesController from '../controllers/ethereumPrices.js';

const router = express.Router();

router.get('/prices', (req, res) => {
    ethereumPricesController.fetchAndStoreEthereumPrices();
    res.status(200).json({ message: "Price fetching triggered" });
});

export default router;
