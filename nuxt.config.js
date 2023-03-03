import colors from 'vuetify/es5/util/colors'
require('dotenv').config({
  path: './config/config.env',
})
export default {
  server: {
    host: process.env.HOST || '0.0.0.0',
    port: process.env.PORT || 4000,
  },
  env:{
    socketUrl: process.env.SERVER_URL,
  },


  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    titleTemplate: '%s - eCommerceAdmin',
    title: 'eCommerceAdmin',
    htmlAttrs: {
      lang: 'en',
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
      { name: 'format-detection', content: 'telephone=no' },
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
    { src: '~/assets/sass/main.scss' },
  ],

  plugins: [
    {src:'~/plugins/redirect'},
    {src:'~/plugins/vue-confirm-dialog', mode: 'client'},
    { src: '~/plugins/vue-quill-editor', mode: 'client' },
    { src: '~/plugins/vue-print-nb', mode: 'client' },
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  buildModules: [
    '@nuxtjs/vuetify',
  ],
  moment: {
    defaultLocale: 'RU',
    locales: ['RU', 'TM'],
  },
  modules: [
    '@nuxtjs/axios',
    'cookie-universal-nuxt',
    // '@nuxtjs/pwa',
    [
      '@nuxtjs/i18n',
      {
        strategy: 'no_prefix',
        locales: [
          {
            code: 'RU', 
            file: 'ru_RU.js',
            name: 'RU',
          },
          {
            code: 'TM',
            file: 'tm_TM.js',
            name: 'TM',
          },
        ],
        lazy: true,
        langDir: 'lang/',
        defaultLocale: 'RU',
      },
    ],
  ],

  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {
    baseURL: process.env.SERVER_URL || 'http://localhost:5000',
  },

  // Vuetify module configuration: https://go.nuxtjs.dev/config-vuetify
  vuetify: {
    customVariables: ['~/assets/variables.scss'],
    theme: {
      dark: true,
      themes: {
        dark: {
          primary: colors.blue.darken2,
          accent: colors.grey.darken3,
          secondary: colors.amber.darken3,
          info: colors.teal.lighten1,
          warning: colors.amber.base,
          error: colors.deepOrange.accent4,
          success: colors.green.accent3,
        },
      },
    },
  },

  publicRuntimeConfig:{
    url:process.env.SERVER_URL || 'http://localhost:4000'
  } ,
  build: {
    loaders:{
      sass:{
        implementation:require('sass'),
      },
      scss:{
        implementation:require('sass'),
      }
    },
    extend(config, ctx) {
      config.module.rules.push({
        test: /\.(ogg|mp3|wav|mpe?g)$/i,
        loader: 'file-loader',
        options: {
          name: '[path][name].[ext]'
        }
      })
    }
  },
}
