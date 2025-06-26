import { v2 as cloudinary } from "cloudinary";
import fs from "fs"; //built in node module for file system operations

//configuring cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const uploadOnCloudinary = async (localFilePath) => {
  try {
    if (!localFilePath) return null;
    const response = await cloudinary.uploader.upload(localFilePath, {
      resource_type: "auto",
    });
    console.log("File uploaded on cloudinary. File src:" + response.url);
    //once the file is uploaded, we would like to delete it from the local system
    fs.unlinkSync(localFilePath); // Delete the local file after upload
  } catch (error) {
    fs.unlinkSync(localFilePath); // Delete the local file if upload fails
    return null;
  }
};

export { uploadOnCloudinary };
