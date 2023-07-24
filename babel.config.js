module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  env: {
    test: {
      presets: ["@babel/preset-env", "@babel/preset-react"]
    }
  },
  plugins: [
    ['react-native-reanimated/plugin', {
        relativeSourceLocation: true,
    },],
    "@babel/plugin-transform-modules-commonjs",
    '@babel/plugin-transform-flow-strip-types', // Flatlist get item issue fix
    ["@babel/plugin-transform-class-properties",{loose:true}],
    ["@babel/plugin-transform-private-methods",{loose:true}],
    ["@babel/plugin-transform-private-property-in-object",{loose:true}]
  ]
};