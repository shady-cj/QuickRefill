// schema file to parse json body and validate them
import { z } from "zod";

export const RegisterUserSchema = z.object({
    email: z.string({
        required_error: "Email is required",
        invalid_type_error: "Email must be a string",
    }).email({ message: "Invalid email address" }),
    name: z.string({
        required_error: "Name is required",
        invalid_type_error: "Name must be a string",
    }),
    password: z.string().min(6, { message: "Password must atleast be 6 characters long" }),
    role: z.enum(["ADMIN", "CUSTOMER", "RIDER", "VENDOR"]),
    address: z.string().optional()
})

export const LoginUserSchema = z.object({
    email: z.string({
        required_error: "Email is required",
        invalid_type_error: "Email must be a string",
    }).email({ message: "Invalid email address" }),
    password: z.string().min(6, { message: "Password must atleast be 6 characters long" })
})