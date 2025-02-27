import { NextFunction, Response } from "express";
import { AuthenticatedRequest } from "../../../lib/types/auth";
import { prismaClient } from "../../..";

export const Me = async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    // we'll add the role profiles alongside the user query.
    const userProfile = await prismaClient.user.findUnique({
        where: {
            id: req.user?.id
        },
        include: {
            vendorProfile: req.user?.role === "VENDOR",
            customerProfile: req.user?.role === "CUSTOMER",
            deliveryRepProfile: req.user?.role === "DELIVERY_REP"
        }
    })

    res.json(userProfile)
}

