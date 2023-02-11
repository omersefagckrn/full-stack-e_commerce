import express, { Router } from 'express';
import { deleteUser, getUserById, getUserProfile, getUsers, loginUser, registerUser, updateUser, updateUserProfile } from '../controllers/userControllers';
import { admin, auth } from '../middleware/auth';

const router: Router = express.Router();

router.route('/').get(auth, getUsers).post(registerUser);
router.route('/login').post(loginUser);
router.route('/profile').get(auth, getUserProfile).put(auth, updateUserProfile);
router.route('/:id').delete(auth, admin, deleteUser).get(auth, admin, getUserById).put(auth, admin, updateUser);

export default router;
