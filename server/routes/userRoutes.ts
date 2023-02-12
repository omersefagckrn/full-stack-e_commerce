import express, { Router } from 'express';
import { getUserProfile, loginUser, registerUser, updateUserProfile } from '../controllers/userControllers';
import { auth } from '../middleware/auth';

const router: Router = express.Router();

router.route('/login').post(loginUser);
router.route('/register').post(registerUser);
router.route('/profile').get(auth, getUserProfile).put(auth, updateUserProfile);

export default router;
