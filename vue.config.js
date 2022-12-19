module.exports = {
  css: {
    loaderOptions: {
      sass: {
        additionalData: `
          @import "@/assets/scss/_variables.scss";
        `,
      },
    },
  },
  publicPath:
    process.env.NODE_ENV === 'production' ? '/the-weather-project/' : '/',
};
