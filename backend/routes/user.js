const express = require("express");
const { User } = require("../db")
const zod = require("zod");
const router = express.Router();
const jwt=require("jsonwebtoken");
const JWT_SECRET=require("../config")

const signupSchema = zod.object({
    username: zod.string().email(),
    password: zod.string(),
    firstName: zod.string(),
    password: zod.string()
})


//signin and signup routes are required
router.post("/signup", async (req, res) => {

    const body = req.body;
    const { success } = signupSchema.safeParse(req.body)

    if (!success) {
        return res.json({
            message: "Invalid inputs/Email already taken"
        })
    }
    const user = User.findOne({
        username: body.username
    })

    if (user._id) {
        return res.json({
            message: "Email already Taken/ Incorrect Inputs"
        })
    }

    //Now when inputs are valid and there exists no user with the same email, so we can
    //inintiate a query to create a user in the database

    const dbUser=await User.create(body)
    const token=jwt.sign({
        userId:dbUser._id
    },JWT_SECRET)

    res.json({
        message: "User created Succesfully",
        token:token
    })

})

router.post("/signin",(req,res)=>{

    const body=req.body;
    




})


module.exports = router;