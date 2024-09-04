import mongoose from 'mongoose'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'


const userSchema=new mongoose.Schema({
  username:{
    type:String,
    required:true,
    unique:true,
    lowercase:true,
    trim:true,
    index:true
  },
  email:{
    type:String,
    required:true,
    unique:true,
  },
  fullname:{
    type:String,
    required:true,
    lowercase:true,
    index:true,
  },
  avatar:{
    type:String,
    required:true
  },
  coverImage:{
    type:String
  },
  password:{
    type:String,
    required:[true,"minimum 6 characters"]
  },
  refreshToken:{
    type:String
  },
  watchHistory:[
    {
        type:mongoose.Schema.Types.ObjectId,
        ref:"Video"
    }
  ]
},
{
    timestamps:true
}
)

userSchema.pre('save',async function(next){
if(!this.isModified("password")) return next();
this.password=await bcrypt.hash(this.password,10)
next()
})


userSchema.methods.isPasswordCorrect=async function(password){
  return  await  bcrypt.compare(password,this.password)
}


userSchema.methods.generateAccessToken=function(){
   return jwt.sign(
        //payload
        {
             _id:this._id,
             usename:this.usename,
             email:this.email,
             fullName:this.fullName
        },
        //secret key 
        process.env.ACCESS_TOKEN_SECRET_KEY,

        //expiry
        {
        expiresIn:process.env.ACCESS_TOKEN_EXPIRY
        }
    )
}


userSchema.methods.generateRefreshToken=function(){
    jwt.sign(
        {
            _id:this._id,
        },
        process.env.REFRESH_TOKEN_SECRET_KEY,
        {
            expiresIn:REFRESH_TOKEN_EXPIRY
        }
    )
}

export const User=mongoose.model('User',userSchema)