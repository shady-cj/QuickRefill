import { NextFunction, Response } from "express";
import { AuthenticatedRequest } from "../../lib/types/auth";
import { prismaClient } from "../..";
import { z } from "zod";
import { UnprocessableEntity } from "../../exceptions/validation";
import { AppErrorCode } from "../../exceptions/root";
import { NotFound } from "../../exceptions/404";

export const GetOrderFeedbacks = async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    // req.user?.id
    try {

        await z.object({orderId: z.coerce.number()}).parseAsync(req.params)
    } catch(err: any) {
        throw new NotFound("Route not found", AppErrorCode.NOT_FOUND, err?.issues)
    }
    const orderId = parseInt(req.params.orderId)
    const orderReviews = await prismaClient.order.findFirst({
        where: {
            id: orderId,
            vendorId: req.user?.id
        }, 
        select: {
            reviews: {
                orderBy: {
                    createdAt: "desc"
                }
            },
            
        }, 
    })
    console.log('order reviews', orderReviews)
    if (!orderReviews) {
        throw new NotFound("Order does not exist", AppErrorCode.NOT_FOUND, null)
    }

    res.json(orderReviews)
}

export const CreateOrderFeedback = async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    try {

        await z.object({orderId: z.coerce.number()}).parseAsync(req.params)
    } catch(err: any) {
        throw new NotFound("Route not found", AppErrorCode.NOT_FOUND, err?.issues)
    }
    try {
        await z.object({comment: z.string()}).parseAsync(req.body)
    } catch (err: any) {
        throw new UnprocessableEntity("Unprocessable Entity", AppErrorCode.UNPROCESSABLE_ENTITY, err?.issues)
    }
    const orderId = parseInt(req.params.orderId)
    const comment = req.body.comment

    try {
        const result = await prismaClient.order.update({
          where: {
            id: orderId
          },
          data: {
            // Only update if vendorId matches
            reviews: {
                create: {
                    comment
                }
            }
            // Update data
          },
          include: {
            reviews: {
                orderBy: {
                    createdAt: "desc"
                }
            }
          }
        });
        res.json(result)
      } catch (error: any) {
        if (error.code === 'P2025') {
            throw new NotFound("Route not found", AppErrorCode.NOT_FOUND, null)
        }
        throw error; // Re-throw other errors
      }
}