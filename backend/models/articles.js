
const mongoose = require('mongoose')
const validator = require('validator')
const dns = require('dns')
const bcrypt = require('bcrypt')

// user creation schema 
const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, 'Required username'],
        unique: true,
        lowercase:true
    },
    email: {
        type: String,
        required: [true, 'enter email'],
        unique: true,
        lowercase: true,
        validate: [{
            validator:function(val){
                return validator.isEmail(val)
            },
            message:'enter valid email'
        },{
            validator:function(val){
                return new Promise((resolve)=>{
                    const domain= val.split('@')[1];
                    dns.resolveMx(domain,(err,addresses)=>{
                        if(err || !addresses || addresses.length === 0){
                            resolve(false)
                        }else{
                            resolve(true)
                        }
                    })
                })
              
            },
             message: 'email doain connot receive mail' 
        }
     ]
    },
    password: {
        type: String,
        required: [true, 'Required password'],
        minlength: [6, "Minimum length is 6 characters"]
    },
    post: [{
        type: mongoose.Schema.Types.ObjectId, ref:"Article"
    }]
}, { timestamps: true })

userSchema.pre('save', async function(next){
    const salt = await bcrypt.genSalt();
    this.password = await bcrypt.hash(this.password, salt)
    next()
})

userSchema.statics.login= async function (email,password) {
    const user = await this.findOne({email});
    if(user){
        const userlogin = await bcrypt.compare(password,user.password)
        if(userlogin){
            return user
        }else{
            throw new Error('invalid password')
        }
    }else{
        throw new Error('invalid email')
    }
    
}

const Users = mongoose.model('Users', userSchema)





// article creation schema 
const articlesSchema = new mongoose.Schema({
    title:{
        type:String,
        required: true,
        trim:true
    },
    snippet:{
        type: String,
        required: true,
        trim: true
    },
    body:{
        type: Object,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now    // auto-set current date
    },
    userId:{type:mongoose.Schema.Types.ObjectId, ref:'Users', required: true}
});

const Article = mongoose.model('Article', articlesSchema,'blogs')
module.exports = { Users, Article }