const router = require('express').Router()
const User = require("../modal/User")
const becrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const crypto = require("crypto")
const nodemailer = require("nodemailer")
const sendGridTransport = require("nodemailer-sendgrid-transport")
const uuidV4 = require("uuid")
const cookieParser = require("cookie-parser")

let transporter = nodemailer.createTransport(sendGridTransport({
    auth: {
        api_key: process.env.NODEMAILER_API_KEY
    }
}))


router.post("/signup", async (req,res) => {
    try{
        const {email, password} = req.body

        //validation 
        if(!email || !password){
            return res.status(400).json({errorMessage: "PLease enter all required fields"})
        }
        if(password.length < 6){
            return res.status(400).json({errorMessage: "PLease enter a password of atleast 6 characters"})
        }

        const userAlreadyExist = await User.findOne({email: email})
        if(userAlreadyExist){
            return res.status(400).json({
                errorMessage: "An account already exist with this email"
            })
        }  

        //hashing the password
        const salt = await becrypt.genSalt()
        const passwordHash = await becrypt.hash(password, salt)

        // creating and saving user
        const newUser = new User({
            email, passwordHash
        })

        const savedUser = await newUser.save()

        // logging user in
        const token = jwt.sign({
            user: savedUser._id
        }, process.env.JWT_SECRET)

        res.cookie("token", token, {
            httpOnly: true
        }).send()
    }catch (err){
        console.error(err)
        res.status(500).send()
    } 
})

//login endpoint
router.post("/login", async (req, res) => {
    try{
        const {email, password} = req.body

        //validate 
        if(!email || !password){
            return res.status(400).json({errorMessage: "PLease enter all required fields"})
        }

        const existingUser = await User.findOne({email})
        if(!existingUser){
            return res.status(401).json({errorMessage: "Wrong email or password."})
        }

        const passwordVerify = await becrypt.compare(password, existingUser.passwordHash)
        if(!passwordVerify){
            return res.status(401).json({errorMessage: "Wrong email or password."})
        }

        const token = jwt.sign({
            user: existingUser._id,
        }, process.env.JWT_SECRET)

        res.cookie("token", token, {
            httpOnly: true
        }).send()
    }catch(err){
        console.error(err)
        res.status(500).send()
    }
})

router.get("/logout", (req,res) => {
    res.cookie("token", "", {
        httpOnly: true,
        expires: new Date(0)
    }).send()
})

router.get("/loggedIn", async (req, res) => {
  try {
    const token = req.cookies.token;
    if (!token) return res.json(false);

    jwt.verify(token, process.env.JWT_SECRET);

    res.send(true);

  } catch (err) {
    console.error(err)
    res.json(false);
  }
});


router.get("/user", (req,res) => {
    const token = req.cookies
    User.findOne(token)
    .then(result => res.json(result))
    .catch(err => console.log(err))
})


router.get("/user/:id", (req,res) => {
    User.findById(req.params.id)
    .then(result => {
        res.status(200).json({
            userData: result.email
        })
    })
    .catch(err=> {
        console.log(err)
        res.status(500).json({
            error: err
        })
    }) 
})

router.post('/reset-password', async (req,res)=>{
    crypto.randomBytes(32,(err,buffer)=>{
        if(err){
            console.log(err)
        }
        const token = buffer.toString("hex")
        User.findOne({email:req.body.email})
        .then(user=>{
            if(!user){
                return res.status(400).json({error:"User dont exists with that email"})
            }
            user.resetToken = token
            user.expireToken = Date.now() + 3600000
            user.save().then((result)=>{
                transporter.sendMail({
                    to:user.email,
                    from:"anasyounus20@gmail.com",
                    subject:"password reset",
                    html:`
                    <p>You requested for password reset</p>
                    <h5>click in this <a href="http://localhost:3000/reset/${token}">link</a> to reset password</h5>
                    `
                })
                res.json({message:"check your email"})
            })

        })
    })
})

router.post('/newPassword', async (req,res)=>{
    const newPassword = req.body.password
    const sentToken = req.body.token
    User.findOne({resetToken:sentToken,expireToken:{$gt:Date.now()}})
    .then(user=>{
        if(!user){
            return res.status(422).json({error:"Try again session expired"})
        }
        becrypt.hash(newPassword,12).then(hashedpassword=>{
           user.password = hashedpassword
           user.resetToken = undefined
           user.expireToken = undefined
           user.save().then((saveduser)=>{
               res.json({message:"password updated success"})
           })
        })
    }).catch(err=>{
        console.log(err)
    })
})

module.exports = router