module.exports = {
  presets: [
    [
      '@babel/preset-env',
      {
        targets: {
          node: 'current'
        }
      }
    ],
    '@babel/preset-typescript'
  ],
  plugins: [
    ['@babel/plugin-transform-typescript', {
      allowNamespaces: true
    }],
    [

      'module-resolver',
      {
        alias: {
          '@/*': './src'
        }
      }
    ]
  ],
  ignore: ['**/*.spec.ts']
}
