import { NextFunction, Response } from "express"
import { prismaClient } from "../.."
import { z } from "zod"
import { paginationParamSchema } from "../../schemas/pagination"
import { UnprocessableEntity } from "../../exceptions/validation"
import { AppErrorCode } from "../../exceptions/root"
import { AuthenticatedRequest } from "../../lib/types/auth"

export const GetFeedbacks = async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    try {
        await paginationParamSchema.parseAsync(req.query)
    } catch (err: any) {
        throw new UnprocessableEntity("Unprocessable Entity", AppErrorCode.UNPROCESSABLE_ENTITY, err?.issues)
    }
    
    const {limit, page} = req.query
    let feedbacks;
    if (limit && page) {
        const limitSize = parseInt(limit as string)
        const pageNumber = parseInt(page as string) - 1
        feedbacks = await prismaClient.feedback.findMany({
            orderBy: {
                createdAt: "desc"
            },
            skip: pageNumber * limitSize,
            take: limitSize
    
    
        })
    } else {
        feedbacks = await prismaClient.feedback.findMany({
            orderBy: {
                createdAt: "desc"
            },
        })
    }

    res.json(feedbacks)
    
}

export const PostFeedback = async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    try {
        await z.object({comment: z.string()}).parseAsync(req.body)
    } catch (err: any) {
        throw new UnprocessableEntity("Unprocessable Entity", AppErrorCode.UNPROCESSABLE_ENTITY, err?.issues)
    }
    const {comment} = req.body
    const feedback = await prismaClient.feedback.create({
        data: {
            comment,
            user: {
                connect: {
                    id: req.user?.id
                }
            }
        }
    })
    res.status(201).json(feedback)
}
