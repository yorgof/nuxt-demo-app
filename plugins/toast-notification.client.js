import ToastPlugin from 'vue-toast-notification';
import 'vue-toast-notification/dist/theme-bootstrap.css';
import 'vue-toast-notification/dist/theme-default.css';

export default defineNuxtPlugin((nuxtApp) => {
    const options = {
        position: 'top-right',
        duration: 6000,
        pauseOnHover: true,
        dismissible: true,
    };

    nuxtApp.vueApp.use(ToastPlugin, options);
});