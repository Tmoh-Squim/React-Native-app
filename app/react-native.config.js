module.exports = {
    server: {
      proxy: {
        "/api": {
          target: "https://squim-native-app.onrender.com",
          secure: false,
        },
      },
    },
  };
  