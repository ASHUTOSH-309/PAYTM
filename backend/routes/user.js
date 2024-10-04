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
        return res.status(411).json({
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
    // token=(Header.payload.signature)
    const token=jwt.sign({
        userId:dbUser._id
    },JWT_SECRET)

    res.json({
        message: "User created Succesfully",
        token:token
    })

})

const signinBody = zod.object({
    username: zod.string().email(),
	password: zod.string()
})

router.post("/signin", async (req, res) => {
    const { success } = signinBody.safeParse(req.body)
    if (!success) {
        return res.status(411).json({
            message: "Email already taken / Incorrect inputs"
        })
    }

    const user = await User.findOne({
        username: req.body.username,
        password: req.body.password
    });

    if (user) {
        const token = jwt.sign({
            userId: user._id
        }, JWT_SECRET);

        res.json({
            token: token
        })
        return;
    }


    res.status(411).json({
        message: "Error while logging in"
    })
})


module.exports = router;