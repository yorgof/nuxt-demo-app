import prisma from '~/server/utils/prisma';
import argon2 from "argon2"
import { z } from 'zod'
import jwt from 'jsonwebtoken'

const userSchema = z.object({
    email: z.string().email(),
    password: z.string()
})

const secret = process.env.JWT_SECRET

if (!secret) {
    throw new Error('JWT_SECRET is not defined')
}

export default defineEventHandler(async (event) => {
    try {
        const result = await readValidatedBody(event, body => userSchema.safeParse(body))
        if (!result.success) {
            event.node.res.statusCode = 400;
            return { error: result.error };
        }
        const {email, password} = result.data

        const user = await prisma.user.findUnique({
            where: {
                email
            },
            select: {
                id: true,
                password: true,
                name: true
            }
        })

        if (!user) {
            event.node.res.statusCode = 400;
            return { error: 'Invalid email or password' };
        }

        const passwordMatch = await argon2.verify(user.password, password)

        if (!passwordMatch) {
            event.node.res.statusCode = 400;
            return { error: 'Invalid email or password' };
        }

        const payload = {
            userId: user.id,
            name: user.name
        }

        const token = jwt.sign(payload, secret, {
            expiresIn: '30d'
        });

        console.log(token)

        return ({
            token
        })
    } catch (error: any) {
        console.error(error.message)
        event.node.res.statusCode = 500;
        return { error: 'Something went wrong' };
    }
})
