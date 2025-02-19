import {z} from "zod"


// profile update schema(must provide at least one of these information)
export const ProfileUpdateSchema = z.object({
    email: z.string().email({ message: "Invalid email address" }).optional(),
    name: z.string().optional(),
    address: z.string().optional(),
    phoneNumber: z.string().optional(),
    avatar: z.string().optional(),
}).superRefine((data, ctx) => {
    if (!Object.values(data).some(value => value !== undefined)) {
        ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: "You must provide at least one field to update",
        });
    }
});