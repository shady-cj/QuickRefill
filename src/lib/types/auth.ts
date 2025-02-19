import { Request } from "express"
import { role } from "./payload"
export type RequestUser = {
    id: string,
    email: string,
    role: role
}

export interface AuthenticatedRequest extends Request {
    user?: RequestUser
}