import { Router } from "express";
import { healthcheck } from "../controllers/healthcheck.controller.js";
import {
  registerUser,
  loginUser,
  logoutUser,
} from "../controllers/user.controller.js";
import { upload } from "../middlewares/multer.middlewares.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";

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
// router.route("/register").get(healthcheck);
// router.route("/register").post(registerUser);

router.route("/login").post(loginUser);

//secured routes
router.route("/logout").post(verifyJWT, logoutUser);
export default router;
