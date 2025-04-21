// 

const { getDefaultConfig, mergeConfig } = require('@react-native/metro-config');
const { wrapWithReanimatedMetroConfig } = require('react-native-reanimated/metro-config');

// 1. Get the default Metro config
const defaultConfig = getDefaultConfig(__dirname);

// 2. Your custom config if needed
const customConfig = {
  // Add any custom settings here if needed
};

// 3. Merge the default config with your custom config
const mergedConfig = mergeConfig(defaultConfig, customConfig);

// 4. Wrap the merged config with Reanimated’s wrapper
module.exports = wrapWithReanimatedMetroConfig(mergedConfig);
