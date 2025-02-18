

export type accessTokenPayload = {
    email: string, 
    userId: string,
    role: "ADMIN" | "CUSTOMER" | "VENDOR" | "DELIVERY_REP"
}

