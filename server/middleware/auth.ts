import jwt from "jsonwebtoken";

export default defineEventHandler((event) => {
    // Skip if the request is not an API request
    if (!event.node.req.url!!.startsWith('/api')) {
        return;
    }

    // skip if the request is a preflight request
    if (event.node.req.method === 'OPTIONS') {
        return;
    }

    // skip if the request is a login request or a signup request
    const skipPaths = ['/api/login', '/api/signup']

    if (skipPaths.includes(event.node.req.url!!)) {
        return;
    }

    // get the 'jwt' cookie from the request
    const token = getCookie(event, 'login-token')

    // verify the JWT
    const decoded = token ? jwt.verify(token, process.env.JWT_SECRET!!) : null

    if (!decoded) {
        // redirect to login page if the JWT is invalid
        return sendRedirect(event, '/login');
    }
})
