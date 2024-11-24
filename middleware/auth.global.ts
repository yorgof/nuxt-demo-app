export default defineNuxtRouteMiddleware((to, from) => {
    const isLoggedIn = useState('isLoggedIn', () => false); // Replace with actual authentication logic

    const unRestrictedPaths = ['/', '/login', '/signup'];

    if (unRestrictedPaths.includes(to.path)) {
        return
    }

    if (!isLoggedIn.value) {
        return navigateTo('/login');
    }
});