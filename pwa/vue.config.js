module.exports = {
  "transpileDependencies": [
    "vuetify"
  ],
  devServer: {
    host: '0.0.0.0',       // Required for hot-reloading of external clients
    disableHostCheck: true // Allow connections from external (use with caution due to DNS rebind!)
  }
}
