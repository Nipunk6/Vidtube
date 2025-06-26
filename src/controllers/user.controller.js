import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { User } from "../models/user.models.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import { ApiResponse } from "../utils/ApiResponse.js";

const registerUser = asyncHandler(async (req, res) => {
  //get user details
  //validation-not empty
  //checking if the user already exists
  //check for image,check for avatar
  //upload them to cloudinary
  //create user object-create entry in database
  //remove password and refresh token field from response
  //check for user creation
  //return res

  const { fullName, email, username, password } = req.body;

  // if(fullName?.trim()=== ""){
  //   throw new ApiError(400, "All fields are required");
  // }
  if (
    [fullName, email, username, password].some((field) => field?.trim() === "") //check if any field is empty
  ) {
    throw new ApiError(400, "All fields are required");
  }

  const existedUser = await User.findOne({
    //since user is created through mongoose so it can access database directly
    $or: [{ username }, { email }], //check if username or email already exists
  });
  if (existedUser) {
    throw new ApiError(409, "Username or email already exists");
  }

  const avatarLocalPath = req.files?.avatar[0]?.path;
  const coverLocalPath = req.files?.coverImage[0]?.path;

  if (!avatarLocalPath) {
    throw new ApiError(400, "Avatar file is required");
  }
  const avatar = await uploadOnCloudinary(avatarLocalPath);
  let coverImage = "";
  if (!coverLocalPath) {
    coverImage = await uploadOnCloudinary(coverLocalPath);
  }
  if (!avatar) {
    throw new ApiError(400, "Avatar file is required");
  }

  const user = await User.create({
    fullName,
    avatar: avatar.url,
    coverImage: coverImage?.url || "",
    email,
    password,
    username: username.toLowerCase(),
  });

  const createdUser = await User.findById(user._id).select(
    "-password -refreshToken" //exclude password and refreshToken from response
  );
  if (!createdUser) {
    throw new ApiError(500, "User creation failed");
  }

  return res
    .status(201)
    .json(new ApiResponse(200, createdUser, "User registered successfully"));
});

export { registerUser };
