export default defineEventHandler((event) => {
    const ip = getRequestIP(event, { xForwardedFor: true })
    console.log(`request: ${getRequestURL(event)} from: ${ip}`)
})
