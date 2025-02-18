import { Request } from "express"
export type RequestUser = {
    id: string,
    email: string,
    role: "ADMIN" | "CUSTOMER" | "VENDOR" | "DELIVERY_REP"
}

export interface AuthenticatedRequest extends Request {
    user?: RequestUser
}