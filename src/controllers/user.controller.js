import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/apiError.js";
import { User } from "../models/user.model.js";
import {uploadOnCloudinary } from "../utils/cloudinary.js"
import {ApiResponse} from "../utils/apiResponse.js"

const registerUser = asyncHandler(async (req, res) => {
  //process for creating register user

  /**
   * get user from the frontend
   * validate the information
   * check if user is already existed
   * check for image, check for avatar (if avatar is neccessary)
   * create user object  and create entry in DB
   * remove password and refresh token field from response
   * check for user creation
   * return response
   */

  const { username, fullname, email, password } = req.body;
  console.log("username ", username);

  if (
    [fullname, email, username, password].some((field) => field?.trim() === "")
  ) {
    throw new ApiError(400, "All fields are required");
  }
  const existUser = User.findOne({ $or: [{ username }, { email }] });

  if(existUser){
    throw new ApiError(409, "User with email or username already register")
  }
 const avatarLocalPath = req.files?.avatar[0]?.path;
 const coverImageLocalPath = req.files?.coverImage[0]?.path;

 if(!avatarLocalPath) throw new ApiError(400, "Avatar is required");

 const avatar = await uploadOnCloudinary(avatarLocalPath)
 const coverImage = await uploadOnCloudinary("coverImageLocalPath")

const user =await User.create({
    fullname,
    username: username.toLowerCase(),
    email,
    password,
    avatar : avatar.url,
    coverImage :coverImage?.url || "",
 })

 const userCreated = await User.findById(user._id).select("-password -refreshToken");

 if(!userCreated){
    throw new ApiError(500, "somthing went wrong while registering user")
 }

res.status(201).json(
    new ApiResponse(200, userCreated, "User register Successfully")
)

});

export { registerUser };
