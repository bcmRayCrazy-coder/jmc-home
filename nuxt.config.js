import colors from 'vuetify/es5/util/colors';
import fs from 'fs';
import path from 'path';

/**
 * @type {import('@nuxt/types').NuxtConfig}
 */
const config = {
    // Global page headers: https://go.nuxtjs.dev/config-head
    head: {
        titleTemplate: '%s - JMC生存服官网',
        title: '主页',
        meta: [
            { charset: 'utf-8' },
            {
                name: 'viewport',
                content: 'width=device-width, initial-scale=1',
            },
            {
                hid: 'description',
                name: 'description',
                content: 'jerrymc是一个我的世界Minecraft养老生存服务器',
            },
            { name: 'format-detection', content: 'telephone=no' },
        ],
        link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
    },

    // Global CSS: https://go.nuxtjs.dev/config-css
    css: [],

    // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
    plugins: [{ src: '@/plugins/localStorage', ssr: false }, '@/plugins/lodash'],

    // Auto import components: https://go.nuxtjs.dev/config-components
    components: true,

    // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
    buildModules: [
        // https://go.nuxtjs.dev/vuetify
        '@nuxtjs/vuetify',
    ],

    // Modules: https://go.nuxtjs.dev/config-modules
    modules: [
        // https://go.nuxtjs.dev/axios
        '@nuxtjs/axios',
        // https://go.nuxtjs.dev/pwa
        '@nuxtjs/pwa',
        '@nuxtjs/proxy',
        'vue-toastification/nuxt',
        'cookie-universal-nuxt',
    ],

    // Axios module configuration: https://go.nuxtjs.dev/config-axios
    axios: {
        // Workaround to avoid enforcing hard-coded localhost:3000: https://github.com/nuxt-community/axios-module/issues/308
        proxy: true,
    },
    proxy: {
        '/api': {
            target: 'http://localhost:80',
            pathRewrite: {
                '^/api/': '/',
            },
            changeOrigin: true,
        },
    },

    // PWA module configuration: https://go.nuxtjs.dev/pwa
    pwa: {
        manifest: {
            lang: 'en',
        },
    },

    // Vuetify module configuration: https://go.nuxtjs.dev/config-vuetify
    vuetify: {
        customVariables: ['~/assets/variables.scss'],
        theme: {
            dark: false,
            themes: {
                light: {
                    primary: colors.blue.lighten2,
                    accent: colors.grey.lighten3,
                    secondary: colors.amber.lighten3,
                    info: colors.teal.lighten1,
                    warning: colors.amber.base,
                    error: colors.deepOrange.accent4,
                    success: colors.green.accent3,
                },
            },
        },
    },

    // Build Configuration: https://go.nuxtjs.dev/config-build
    build: {},

    server: {
        host: '0.0.0.0',
        port: 1200,
        // https: {
        //     key: fs.readFileSync(path.resolve(__dirname, 'https/www.jerrymc.cn.key')),
        //     cert: fs.readFileSync(path.resolve(__dirname, 'https/www.jerrymc.cn.pem')),
        // }
    },
};

export default config;