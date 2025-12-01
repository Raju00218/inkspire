const { transform } = require('lodash');
const {Users} = require('../models/articles')
const jwt = require('jsonwebtoken')
const nodemailer = require('nodemailer')

const handleError = (err) => {
    let errors = {username:"", email: "", password: "" };

    // duplicate error code

    if (err.code === 11000) {
        const field = Object.keys(err.keyValue)[0];
        if (field === 'username') {
            errors.username = 'username already taken'
        } else {
            errors.email = 'email already in use'
        }
        return errors
    }
    //error handling for login page 
    if (err.message === 'invalid email') {
        errors.email = ' Email not registerd'
        return errors
    }

    if (err.message === 'invalid password') {
        errors.password = 'password incorrect'
        return errors
    }

    if (err.message.includes('Users validation failed' ||'MongooseError')) {
        Object.values(err.errors).forEach(({ properties }) => {
            errors[properties.path] = properties.message;
        });
    }
    return errors
}



const signUp_post = async (req,res)=>{
// const maxAge = 1*60*60
  const {username,email,password} = req.body
   try{
       const user = await Users.create({ username, email, password })
    //    const verifyToken = jwt.sign({ userId: user._id }, process.env.JWT_SECRET,{expiresIn:maxAge})
    //    const url = `https://localhost:3000/verify?token=${verifyToken}`;


    //    const transpoter = nodemailer.createTransport({
    //        service: "gmail",
    //        auth: {
    //            user: process.env.EMAIL_USER,
    //            pass: process.env.EMAIL_PASS,
    //        }
    //    })
    //    const mailOptions ={
    //     from: process.env.EMAIL_USER,
    //     to:user.email,
    //     subject:"Verify your email",
    //     html:`click <a href="${url}">here</a> to verify your emain`
    //    }
    
    //    transpoter.sendMail(mailOptions,(err,info)=>{
    //     if(err){
    //         console.log("err verify send mail:",err)
    //     }else{
    //         console.log("Email sent:",info.response)
    //     }
    //    })
    //    res.status(201).json({message :"verification email sent"})
       res.status(201).json({user})
   }catch(err){
    console.log(err)
    const errors = handleError(err)
    console.log(errors)
       res.status(400).json({errors})
   }

}
// const verify_get = (req, res, next)=>{
//     try{
//         const {verifyToken} = req.query;
//         if(verifyToken){
//             jwt.verify(verifyToken, process.env.JWT_SECRET,async(err, decoded)=>{
//                 if(err){
//                     console.log(err)
//                     next()
//                 }else{
//                     await Users.findByIdAndUpdate(decoded.userId,{isVerified:true})
//                     res.json({message:"Email verified successfully"})
//                 }

//             })
//         }
//     }catch(err){
//         console.log(err)
//         res.status(400).json({ error: "Invalid or expired token" });
//     }
// }
const maxAge= 1*60*60*24
const jwtoken =(id)=>{
    return jwt.sign({ id }, process.env.JWT_SECRET,{expiresIn:maxAge})
}

const login_post = async (req, res) => {
    const {  email, password } = req.body
    try {
        const user = await Users.login(email, password )
        const token = jwtoken(user._id)
        res.cookie('info', token, { httpOnly: true, 
                                   secure:true,
                                   maxAge:maxAge*1000, 
                                   sameSite: "none",
                                   domain: ".inkspire-7yk5.onrender.com",
                                   path: "/"
                                  })
        res.status(201).json({ 
            status:'success',
            message:'login successfull',
            username: user.username
        })
    } catch (err) {
        console.log(err)
        const errors = handleError(err)
        res.status(400).json({ errors })
    }
}
const login_get=(req,res)=>{
    res.json({
        authenticated: !!res.locals.user,
        user: res.locals.user ?
         { 
            id: res.locals.user._id,
            username:res.locals.user.username,
            post:res.locals.user.post
        }:null
    });
}
const logout_post = (req, res) => {
    res.clearCookie('info',{
        httpOnly: true, 
 secure: true,     
    sameSite: "none",
        domain: ".inkspire-7yk5.onrender.com",
    path: "/",
        maxAge: 0
    })
res.status(200).send({status:"Logged out"});

};

module.exports={
    signUp_post,
    login_post,
    login_get,
    logout_post,

}
