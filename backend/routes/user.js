const express = require("express");
const { User } = require("../db")
const zod = require("zod");
const router = express.Router();
const jwt = require("jsonwebtoken");
const JWT_SECRET = require("../config");
const { authMiddleware } = require("../middleware");

const signupSchema = zod.object({
    username: zod.string().email(),
    firstName: zod.string(),
    lastName: zod.string(),
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

    const dbUser = await User.create({
        username: req.body.username,
        password: req.body.password,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
    })


    // token=(Header.payload.signature)
    const token = jwt.sign({
        userId: dbUser._id
    }, JWT_SECRET)

    return res.json({
        message: "User created Succesfully",
        token: token
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

        return res.json({
            message: "User Logged In Succesfully",
            token: token
        })

    }


    return res.status(411).json({
        message: "Error while logging in"
    })
})


const UpdateSchema = zod.object({
    password: zod.string().optional(),
    firstName: zod.string().optional(),
    lastName: zod.string().optional(),
})

router.put("/", authMiddleware, async (req, res) => {

    const body = req.body;

    const { success } = UpdateSchema.safeParse(body)
    //Check for schema validation
    if (!success) {
        return res.status(411).json({
            message: "Invalid Inputs/Error While updating"
        })
    }
 
    await User.updateOne(req.body, {
        _id: req.userId
    })

    res.json({
        message: "Updated successfully"
    })


})

/* 
This is needed so users can search for their friends and send them money

Method: GET
Route: /api/v1/user/bulk
Query Parameter: `?filter=harkirat`

Response:

Status code - 200
*/
router.get("/bulk", async (req, res) => {
    const filter = req.query.filter || "";


    /* 
        crux is show the results for which filter exists as a substring either in firstname or lastname 
    */
    const users = await User.find({
        $or: [{
            firstName: {
                "$regex": filter
            }
        }, {
            lastName: {
                "$regex": filter
            }
        }]
    })

    res.json({
        user: users.map(user => ({
            username: user.username,
            firstName: user.firstName,
            lastName: user.lastName,
            _id: user._id
        }))
    })
})


module.exports = router;