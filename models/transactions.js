import mongoose, { Schema } from 'mongoose';

const transactionSchema = new Schema({
    blockNumber: String,
    timeStamp: String,
    hash: String,
    nonce: String,
    blockHash: String,
    transactionIndex: String,
    from: String,
    to: String,
    value: String,
    gas: String,
    gasPrice: String,
    isError: String,
    txreceipt_status: String,
    input: String,
    contractAddress: String,
    cumulativeGasUsed: String,
    gasUsed: String,
    confirmations: String,
    methodId: String,
    functionName: String,
});

const userSchema = new Schema({
    address: {
        type: String,
        required: true,
        trim: true,
    },
    transactions: [transactionSchema], // Array of transaction objects
},{timestamps:true});

export const User = mongoose.model('User', userSchema);
