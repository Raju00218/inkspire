const {Users} = require('../models/articles')
const jwt = require('jsonwebtoken')

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

  const {username,email,password} = req.body
   try{
       const user = await Users.create({ username, email, password })
       res.status(201).json({user})
   }catch(err){
    console.log(err)
    const errors = handleError(err)
    console.log(errors)
       res.status(400).json({errors})
   }

}
const maxAge= 1*60*60*24
const jwtoken =(id)=>{
    return jwt.sign({ id }, process.env.JWT_SECRET,{expiresIn:maxAge})
}

const login_post = async (req, res) => {
    const {  email, password } = req.body
    try {
        const user = await Users.login(email, password )
        const token = jwtoken(user._id)
        res.cookie('info', token, { httpOnly: true, secure: false, maxAge:maxAge*1000})
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
        user: res.locals.user || null
    });
}
const logout_get = (req, res) => {
    res.cookie('info', '', { maxAge: 1 });
    res.redirect('/');
};

module.exports={
    signUp_post,
    login_post,
    login_get,
    logout_get
}