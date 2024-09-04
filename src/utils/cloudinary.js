import {v2 as cloudinary} from 'cloudinary'
import fs from 'fs'
import dotenv from 'dotenv'

dotenv.config()


cloudinary.config({ 
    cloud_name:process.env.CLOUDINARY_CLOUD_NAME, 
    api_key:process.env.CLOUDINARY_API_KEY, 
    api_secret:process.env.CLOUDINARY_SECRET_KEY // Click 'View API Keys' above to copy your API secret
});

const uploadCloudinary=async (localFilePath)=>{
    try {
        if(!localFilePath) return null;
       const response= await cloudinary.uploader.upload(localFilePath,{
            resource_type:'auto'
        })

        //file upload successfully
        console.log("File upload successfully",response.url);
        return response
        

    } catch (error) {
        fs.unlinkSync(localFilePath) //removed file thode failed to upload and svaed to temporary in locally
        return null 
    }
    
}

export {uploadCloudinary}