import express, { Router } from 'express';
import { getUserProfile, loginUser, registerUser, updateUserProfile, addNewAddress, deleteAddress, getUserAddresses } from '../controllers/userControllers';
import { auth } from '../middleware/auth';

const router: Router = express.Router();

router.route('/login').post(loginUser);
router.route('/register').post(registerUser);
router.route('/profile').get(auth, getUserProfile).put(auth, updateUserProfile);
router.route('/:id/add-new-address').post(auth, addNewAddress);
router.route('/:id/get-address').get(auth, getUserAddresses);
router.route('/:id/delete-address/:address').delete(auth, deleteAddress);
export default router;