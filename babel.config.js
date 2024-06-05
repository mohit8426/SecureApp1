module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  plugins: [
    ['@babel/plugin-transform-runtime', {
      "absoluteRuntime": false,
      "corejs": false,
      "helpers": true,
      "regenerator": true,
      "useESModules": false
    }],
    ['@babel/plugin-transform-class-properties', { "loose": true }],
    ['@babel/plugin-transform-private-methods', { "loose": true }],
    ['@babel/plugin-transform-private-property-in-object', { "loose": true }]
  ]
};
