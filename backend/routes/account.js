const express = require("express");
const { Account } = require("../db");
const mongoose=require("mongoose");
const { authMiddleware } = require("../middleware");

const router = express.Router();

/* All requests with path starting path /api/v1/account 
    wil be routed here 

1. What if the database crashes right after the first request (only the balance is decreased for one user, and not for the second user)

2. What if the Node.js crashes after the first update?

It would lead to a `database inconsistency`. Amount would get debited from the first user, and not credited into the other users account.

If a failure ever happens, the first txn should rollback.

This is what is called a `transaction` in a database. We need to implement a `transaction` on the next set of endpoints that allow users to transfer INR
*/



/* An endpoint for user to get their balance. */

router.get("/balance",authMiddleware, async (req, res) => {
    console.log("Hi")
    const account = await Account.findOne({
        userId: req.userId
    })

    if(!account){
        return res.status(400).json({

            msg:"Invalid account/User Not found"
        })
    }
    return res.status(200).json({
        balance: account.balance
    })
})

/* 
An endpoint for user to transfer money to another account
*/

router.put("/transfer", authMiddleware, async (req, res) => {
    const session = await mongoose.startSession();

    session.startTransaction();
    const { amount, to } = req.body;
    console.log(req.body)

    // Fetch the accounts within the transaction
    console.log(req.userId)
    const account = await Account.findOne({ userId: req.userId }).session(session);
    console.log(account)
    if (!account || account.balance < amount) {
        await session.abortTransaction();
        return res.status(400).json({
            message: "Insufficient balance"
        });
    }

    let toAccount = await Account.findOne({ userId:new mongoose.Types.ObjectId(to) }).session(session);
    console.log(toAccount)
    if (!toAccount) {
        await session.abortTransaction();
        return res.status(400).json({
            message: "Invalid account"
        });
    }

    // Perform the transfer
    await Account.updateOne({ userId: req.userId }, { $inc: { balance: -amount } }).session(session);
    await Account.updateOne({ userId: to }, { $inc: { balance: amount } }).session(session);

    // Commit the transaction
    await session.commitTransaction();
   return res.json({
        message: "Transfer successful"
    });
});




module.exports = router;