import { Router } from "express";

import { registerUser } from "../controllers/user.controller.js";
import { upload } from "../middlewares/multer.middlewares.js";

const router = Router();

router.route("/register").post(
  upload.fields([
    {
      name: "avatar",
      maxCount: 1, //max 1 file for avatar
    },
    {
      name: "coverImage",
      maxCount: 1, //max 1 file for cover image
    },
  ]),
  registerUser
); //post request as we are receiving data from the user

export default router;
