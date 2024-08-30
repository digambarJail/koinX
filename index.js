import connectDB from "./db/dbConnection.js";
import express from "express";
import useRouter from "./routes/transactions.routes.js";

connectDB();

const app = express();

app.use('/api', useRouter);

app.listen(process.env.PORT, () =>{
    console.log("Listening on PORT! ")
})
