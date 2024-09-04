import  asynchandler from '../utils/asynchandler.js'
import { ApiError } from '../utils/ApiError.js';
import { User } from '../models/user.models.js';
import uploadCloudinary from '../utils/cloudinary.js';
import { ApiResponce } from '../utils/ApiResponse.js';

export const registerUser=asynchandler(async(req,res)=>{
//registation user
    //1:- get a user details from frontend using rew.body
    //2:- user validation - empty
    //3:- check username and email is already exists.
    //4:- check for images and check avatar.
    //5:- upload the avtar to an cloudinary
    //6:- create a user object - create entry in db
    //7:- remove password and refresh token from response
    //8:- check user creation
    //9:- send res


    const {usename,email,fullname,password}=req.body;
    console.log("email",email);

    // if(usename === ""){
    //  throw new ApiError(401,"All fields are required")
    // }

    if(
        [fullname,usename,email,password].some((fields)=>{fields?.trim()===""})
        
    ){
            throw new ApiError(400,"All fields are required")
    }


    const existUser= User.findOne({$or:[{username},{email}]})
    
    if(existUser){
        throw new ApiError(409,"User is already exists")
    }


    //files handel

    // req.files?.avatar[0]?.path checks if req.files exists, then checks if the avatar field exists, then checks if there's at least one file in the avatar array, and finally retrieves the path of that file.
    //?. is optional chainig they checks the value before null or undefined and returns undefined.
    const avatarLocationPath= req.files?.avatar[0]?.path
    const coverImageLocationPath=req.files?.coverImage[0]?.path

    if(!avatarLocationPath){
        throw new ApiError(400,"Avatar is required")
    }

    //upload cloudinary image 

 const avatar=await uploadCloudinary(avatarLocationPath)
 const coverImage=await uploadCloudinary(coverImageLocationPath)

  if(!avatar){
    throw new ApiError(400,"Avatar is required")
  }


 // db create
 const user=await User.create({
    fullname,
    avatar:avatar.url,
    coverImage:coverImage?.url || "",
    email,
    password,
    username:usename.toLowerCase()
 })

 const createdUser=User.findById(user._id).select(
    "-password -refreshToken"
 )

 if(createdUser){
    throw new ApiError(500,"Somthin went wrong while registration")
 }

 return res.status(201).json(
    new ApiResponce(200,createdUser,"User created successfully")
 )



})