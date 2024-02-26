const { getDefaultConfig, mergeConfig } = require('@react-native/metro-config');

const config = {
  resolver: { 
    extraNodeModules: {
      // Point to WSA device when running on WSA, otherwise use default behavior
      'react-native-windows': isWSA() ? 'http://127.0.0.1:58526' : null,
    },
  },
};

function isWSA() {
  // Logic to determine if running on WSA
  // You can use environment variables or other methods to detect WSA
  return process.platform === 'win32' && process.env.WINDOWS_SUBSYSTEM_FOR_LINUX;
}

module.exports = mergeConfig(getDefaultConfig(__dirname), config);
