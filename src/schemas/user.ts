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
    password: z.string().min(6, { message: "Password must atleast be 6 characters long" }).optional(),
    role: z.enum(["ADMIN", "CUSTOMER", "DELIVERY_REP", "VENDOR"]),
    isSocialAccount: z.boolean(),
    socialAccountProvider: z.enum(["FACEBOOK", "GOOGLE"]).optional(),
    address: z.string().optional(),
    phoneNumber: z.string().optional()
}).superRefine((data, ctx) => {
    if (!data.isSocialAccount) {
        // If not a social account, password is required
        if (!data.password) {
            ctx.addIssue({
                code: z.ZodIssueCode.custom,
                message: "Password is required for non-social account registration",
                path: ["password"]
            });
        }
        // Ensure socialAccountProvider is not provided
        if (data.socialAccountProvider) {
            ctx.addIssue({
                code: z.ZodIssueCode.custom,
                message: "Social account type should not be provided for non-social account registration",
                path: ["socialAccountProvider"]
            });
        }
    } else {
        // If it is a social account, socialAccountProvider is required
        if (!data.socialAccountProvider) {
            ctx.addIssue({
                code: z.ZodIssueCode.custom,
                message: "Social account type is required for social account registration",
                path: ["socialAccountProvider"]
            });
        }
        // Ensure password is not provided
        if (data.password) {
            ctx.addIssue({
                code: z.ZodIssueCode.custom,
                message: "Password should not be provided for social account registration",
                path: ["password"]
            });
        }
    }
});

export const LoginUserSchema = z.object({
    email: z.string({
        required_error: "Email is required",
        invalid_type_error: "Email must be a string",
    }).email({ message: "Invalid email address" }),
    password: z.string().min(6, { message: "Password must atleast be 6 characters long" }).optional()
})