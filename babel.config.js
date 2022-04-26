module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  env: {
    production: {},
  },
  plugins: [
    [
      '@babel/plugin-proposal-decorators',
      {
        legacy: true,
      },
    ],
    ['@babel/plugin-proposal-optional-catch-binding'],
    ['module:react-native-dotenv',{
      'moduleName': '@env',
      'envName': 'MY_ENV',
      'path': '.env',
      'blacklist': null,
      'whitelist': null,
      'safe': false,
      'allowUndefined': true,
    }],
  ],
};
