// app.config.ts
export default defineAppConfig({
    // Global page headers
    head: {
        title: 'My Nuxt 3 Application',
        meta: [
            { charset: 'utf-8' },
            { name: 'viewport', content: 'width=device-width, initial-scale=1' },
            { hid: 'description', name: 'description', content: 'My Nuxt 3 application description' }
        ],
        link: [
            { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
        ]
    },
    // Global page transitions
    pageTransition: {
        name: 'page',
        mode: 'out-in'
    },
    ui: {
        notifications: {
            position: 'top-right',
            duration: 10000,
            dismissible: true,
        }
    }
});