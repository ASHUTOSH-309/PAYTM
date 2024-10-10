const express = require("express");
const { Account, User } = require("../db");


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

router.get("/balance", async (req, res) => {
    const account = await Account.findOne({
        userId: req.userId
    })
    return res.status(200).json({
        balance: account.balance
    })
})

/* 
An endpoint for user to transfer money to another account
*/

router.post("/transfer", async (req, res) => {

    const { to, amount } = req.body;


    const sender = await Account.findOne({
        _id: req.userId
    })

    if (sender.balance < amount) {
        return res.json({
            msg: "Insufficent balance in the account"
        })
    }

    const receiver = await Account.findOne({
        userId: to
    })

    if (!receiver) {
        return res.status(400).json({
            message: "Invalid user Account"
        })
    }
    // Debiting the sender's account
    await Account.updateOne({
        userId: req.userId
    }, {
        $inc: {
            balance: -amount
        }
    })

    //Crediting the receiver's account
    await Account.updateOne({
        userId: to
    }, {
        $inc: {
            balance: amount
        }
    })


    return res.status(200).json({
        message: "Transaction done succesfully"
    })

})




module.exports = router;