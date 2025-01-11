import mongoose from "mongoose";
import { Account } from "../models/Account.model";



// getting balance
export const getBalance = async (req,res) => {
 const account = await Account.findOne({
    userId:req.userId
 });
 res.json({
    balance: account.balance
 })
};

// transfer amount

export const transferAmount = async (req,res) => {
    const session = await mongoose.startSession();

    session.startTransaction();
    const {amount, to} = req.body;

    //fetch the accounts within the transaction
    const account = await Account.findOne({userId: req.userId}).session(session);

    if(!account || account.balance < amount){
        await session.abortTransaction();
        return res.status(400).json({
            message: "Insufficient balance"
        });
    }
    const toAccount = await Account.findOne({userId:to}).session(session);

    if(!toAccount){
        await session.abortTransaction();
        return res.status(400).json({
            message:"Invalid account"
        })
    }

    //perform the transfer
    await Account.updateOne({userId:req.userId}, {$inc: {balance: -amount}}).session(session);
    await Account.updateOne({userId:to}, {$inc: {balance:amount}}).session(session);

    //commit the transaction
    await session.commitTransaction();
    res.json({
        message:"Transfer successfull"
    })
}