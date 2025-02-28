import { Router } from "express";
import { errorHandler } from "../../lib/handlers/errorHandler";
import { Authentication } from "../../middlewares/authentication";
import { RoleBasedAccess } from "../../middlewares/permissions";
import { GetOrderFeedbacks, CreateOrderFeedback } from "../../controllers/root";

const orderFeedbackRoutes = Router()

orderFeedbackRoutes.use([errorHandler(Authentication)])

orderFeedbackRoutes.route("/:orderId")
    .get([errorHandler(RoleBasedAccess(['VENDOR', 'ADMIN']))], errorHandler(GetOrderFeedbacks))
    .post([errorHandler(RoleBasedAccess(['CUSTOMER']))], errorHandler(CreateOrderFeedback))

export {orderFeedbackRoutes}