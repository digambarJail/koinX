import { Router } from "express";
import { getExpenses, getTransactions } from "../controllers/transactions.js";

const useRouter = Router();

useRouter.route('/getTransactions/:address').get(getTransactions)
useRouter.route('/getExpenses/:address').get(getExpenses)

export default useRouter;