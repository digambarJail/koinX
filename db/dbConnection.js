import mongoose from "mongoose";
import dotenv from 'dotenv';
import { fetchAndStoreEthereumPrices } from "../controllers/ethereumPrices.js";

dotenv.config();

const connectDB = () =>{
    return new Promise((resolve,reject) =>[
        mongoose.connect(`${process.env.MONGODB_URI}`)
            .then(connectionInstance =>{
                console.log(`MongoDB Connected!!! HOST: ${connectionInstance.connection.host}`)
                fetchAndStoreEthereumPrices();
                resolve(connectionInstance);
            })
            .catch(error =>{
                console.log("Error ",error);
                reject(error);
            })
    ])
}


export default connectDB;