import express, { Router } from 'express';
import { addUserAddress, deleteUserAddress, getUserAddress, getUserProfile, loginUser, registerUser, updateUserAddress, updateUserProfile } from '../controllers/userControllers';
import { auth } from '../middleware/auth';

const router: Router = express.Router();

router.route('/login').post(loginUser);
router.route('/register').post(registerUser);
router.route('/profile').get(auth, getUserProfile).put(auth, updateUserProfile);

router.route('/:id/get-address').get(auth, getUserAddress);
router.route('/:id/delete-address').delete(auth, deleteUserAddress);
router.route('/:id/update-address').put(auth, updateUserAddress);
router.route('/:id/add-new-address').post(auth, addUserAddress);

export default router;
