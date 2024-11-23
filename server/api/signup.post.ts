import prisma from '~/server/utils/prisma';
import argon2 from "argon2"
import { z } from 'zod'

const userSchema = z.object({
    name: z.string().min(3),
    email: z.string().email(),
    password: z.string().min(6)
})

export default defineEventHandler(async (event) => {
    try {
        const result = await readValidatedBody(event, body => userSchema.safeParse(body)) // or `.parse` to directly throw an error
        if (!result.success) {
            event.node.res.statusCode = 400;
            return { error: result.error };
        }
        const {name, email, password} = result.data
        const passwordHash = await argon2.hash(password)
        await prisma.user.create({
            data: {
                name,
                email,
                'password': passwordHash
            }
        })
        return{ message: 'User created successfully' }
    } catch (error: any) {
        console.error(error.message)
        event.node.res.statusCode = 500;
        return { error: 'Something went wrong' };
    }
})
