import { NextFunction, Request, Response } from "express";
import { prismaClient } from "../../..";
import bcrypt from "bcrypt";
import { BadRequest } from "../../../exceptions/badRequests";
import { AppErrorCode } from "../../../exceptions/root";
import { UnprocessableEntity } from "../../../exceptions/validation";
import { RegisterUserSchema } from "../../../schemas/user";
import { sendOTP } from "../../../lib/utils/mail/otp";


export const Register = async (req: Request, res: Response, next: NextFunction) => {

    try {
        await RegisterUserSchema.parseAsync(req.body) // using zod schema to parse the body
    } catch (err: any) {
        throw new UnprocessableEntity("Unprocessable Entity", AppErrorCode.UNPROCESSABLE_ENTITY, err?.issues)
    }

    const {email, password, name, role, isSocialAccount, socialAccountProvider, address, phoneNumber} = req.body
    const user = await prismaClient.user.findUnique({
        where: {
            email: email
        }
    }) 
    if (user) {
        throw new BadRequest(
            "User Already Exists",
            AppErrorCode.USER_ALREADY_EXIST
        )
    } else {
        let newUser;
        if (isSocialAccount) {
            newUser = await prismaClient.user.create({
                data: {
                    email,
                    name,
                    isSocialAccount,
                    socialAccountProvider,
                    role,
                    address: address || null,
                    phoneNumber: phoneNumber || null,
                    emailVerified: true
                }
            })
        } else {

            const hashedPassword = await bcrypt.hash(password, 10)
            newUser = await prismaClient.user.create({
                data: {
                    email,
                    password: hashedPassword,
                    name,
                    role, 
                    address: address || null,
                    phoneNumber: phoneNumber || null
                }
            })
            // console.log("new User", newUser);
            // after creating a user, send an email with an otp to verify.
            await sendOTP(email)
        }
        await createProfileForRole(role, newUser.id)
           
        res.status(201).json(newUser)
    }

}

const createProfileForRole = async (role: "CUSTOMER" | "ADMIN" | "DELIVERY_REP" | "VENDOR", userId: string) => {
    let clientProfileModel: any;
    switch (role) {
        case "CUSTOMER":
            clientProfileModel = prismaClient.customerProfile
            break
        case "DELIVERY_REP":
            clientProfileModel = prismaClient.deliveryRepProfile
            break
        case "VENDOR":
            clientProfileModel = prismaClient.vendorProfile
            break;
        default:
            clientProfileModel = prismaClient.customerProfile
           
    }
    await clientProfileModel.create({
        data: {
            accountBalance: 0.00,
            avgRating: 0.0,
            user: {
                connect: {
                    id: userId
                }
            }
        }
    })
}

