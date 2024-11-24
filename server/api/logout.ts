export default defineEventHandler(async (event) => {
    try {
        // clear the 'login-token' cookie
        setCookie(event, 'login-token', '', {
            httpOnly: true,
            sameSite: 'strict',
            expires: new Date(0)
        })
        return { message: 'Logout successful' }
    } catch (error: any) {
        console.error(error.message)
        event.node.res.statusCode = 500;
        return { error: 'Something went wrong' };
    }
})
