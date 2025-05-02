import { v2 as cloudinary } from "cloudinary";
import fs from "fs";
import "dotenv/config";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const uploadOnCloudinary = async (localFilePath) => {
  try {
    if (!localFilePath) return null;
    // Upload the file on Cloudinary
    const response = await cloudinary.uploader.upload(localFilePath, {
      resource_type: "auto",
    });
    // console.log("File is uploaded on cloudinary!!!", response.url);

    fs.unlinkSync(localFilePath);

    return response;
  } catch (error) {
    console.log("❌ Cloudinary upload failed:", error.message);

    try {
      fs.unlinkSync(localFilePath); // Remove the locally saved temporary file if the upload operation failed
    } catch (unlinkErr) {
      console.error("❌ Failed to delete temp file:", unlinkErr.message);
    }

    return null;
  }
};

const deleteFromCloudinary = async (publicId) => {
  try {
    if (!publicId) return null;
    // Delete the file from Cloudinary
    const response = await cloudinary.uploader.destroy(publicId, {
      resource_type: "auto",
    });
    // console.log("File is deleted from cloudinary!!!", response);

    return response;
  } catch (error) {
    console.log("❌ Cloudinary delete failed:", error.message);
    return null;
  }
};

export { uploadOnCloudinary, deleteFromCloudinary };
