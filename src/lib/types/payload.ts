
export type role = "ADMIN" | "CUSTOMER" | "VENDOR" | "DELIVERY_REP"
export type accessTokenPayload = {
    email: string, 
    userId: string,
    role: role
}

