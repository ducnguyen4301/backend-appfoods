import { signinUser, signupUser, getUserProfile } from "../controllers";

const router = require("express").Router();
// const {signupUser,signinUser} = require('../controllers/user');

const { userValidator, validate } = require("../middleware/userValidator");
router.post("/signup", userValidator, validate, signupUser);
router.post("/signin", signinUser);
router.get("/profile", getUserProfile);
export { router as userRouter };
