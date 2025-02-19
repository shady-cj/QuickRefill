// role based permission middleware

import { NextFunction, Response } from "express";
import { AuthenticatedRequest } from "../lib/types/auth";
import { ForbiddenRequest } from "../exceptions/forbiddenRequest";
import { AppErrorCode } from "../exceptions/root";
import { role } from "../lib/types/payload";



export const RoleBasedAccess = (roles: role[]) => {
    return (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
        if (roles.includes(req.user?.role!)) {
            next()
        } else {
            throw new ForbiddenRequest("Permission Denied", AppErrorCode.PERMISSION_DENIED, {"error": "You don't have the permission to access this resource"})
        }
    }
}
