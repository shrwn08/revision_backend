import { v2 as cloudinary } from "cloudinary";
import fs from "fs"

    // Configuration
    cloudinary.config({ 
        cloud_name: process.env.CLOUDNARY_CLOUD_NAME, 
        api_key: process.env.CLOUDNARY_API_KEY, 
        api_secret: process.env.CLOUDNARY_API_SECRET 
    });


    const uploadOnCloudinary = async (localFilepath) => {
        try {
            if (!localFilepath) return null;
            //upload file on cloudinary
            const response = await cloudinary.uploader.upload(localFilepath, {
                resource_type: "auto"
            })
            //file uploaded successfully
            console.log("file uploaded successfully on cloudinary", response.url)
            
            return response;
        } catch (error) {
            fs.unlinkSync(localFilepath) //remove the locally saved temp file as the upload opretion got failed
            return null
        }
    }

export  {uploadOnCloudinary}


// (async function() {

//     // Configuration
//     cloudinary.config({ 
//         cloud_name: process.env.CLOUDNARY_CLOUD_NAME, 
//         api_key: process.env.CLOUDNARY_API_KEY, 
//         api_secret: process.env.CLOUDNARY_API_SECRET 
//     });
    
//     // Upload an image
//      const uploadResult = await cloudinary.uploader
//        .upload(
//            'https://res.cloudinary.com/demo/image/upload/getting-started/shoes.jpg', {
//                public_id: 'shoes',
//            }
//        )
//        .catch((error) => {
//            console.log(error);
//        });
    
//     console.log(uploadResult);
    
//     // Optimize delivery by resizing and applying auto-format and auto-quality
//     const optimizeUrl = cloudinary.url('shoes', {
//         fetch_format: 'auto',
//         quality: 'auto'
//     });
    
//     console.log(optimizeUrl);
    
//     // Transform the image: auto-crop to square aspect_ratio
//     const autoCropUrl = cloudinary.url('shoes', {
//         crop: 'auto',
//         gravity: 'auto',
//         width: 500,
//         height: 500,
//     });
    
//     console.log(autoCropUrl);    
// })();
