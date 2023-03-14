import express, { Router } from 'express';
import { newOrder , getUserOrders, getAllOrders} from '../controllers/orderControllers';
import { admin, auth } from '../middleware/auth';

const orderRouter: Router = express.Router();


orderRouter.route("/new-order").post(auth, newOrder);
orderRouter.route("/:user").get(auth, getUserOrders);
orderRouter.route("/").get(auth, getAllOrders);
export default orderRouter;
