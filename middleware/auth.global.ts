export default defineNuxtRouteMiddleware((to, from) => {
    const isLoggedIn = useState('isLoggedIn', () => false); // Replace with actual authentication logic

    switch (to.path) {
        case '/':
        case '/login':
        case '/signup':
            return;
    }


    const token = localStorage.getItem('token');

    if (!isLoggedIn.value) {
        return navigateTo('/login');
    }
});