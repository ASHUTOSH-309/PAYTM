const express = require("express");
const { Account } = require("../db");


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

router.get("/balance",async (req,res)=>{
    const account=await Account.findOne({
        userId: req.userId
    })
    return res.status(200).json({
        balance:account.balance
    })
})





module.exports = router;