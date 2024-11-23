export default defineNuxtRouteMiddleware((to, from) => {
    const isLoggedIn = useState('isLoggedIn', () => false); // Replace with actual authentication logic

    if (to.path === '/login') {
        return;
    }

    if (!isLoggedIn.value) {
        return navigateTo('/login');
    }
});