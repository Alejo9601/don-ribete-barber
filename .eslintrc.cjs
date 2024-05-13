module.exports = {
  root: true,
  env: { browser: true, es2020: true },
  extends: [
    'standard',
    'plugin:@typescript-eslint/recommended',
    'plugin:react-hooks/recommended',
    'prettier'
  ],
  ignorePatterns: ['dist', '.eslintrc.cjs'],
  parser: '@typescript-eslint/parser',
  plugins: ['react-refresh', 'prettier'],
  rules: {
    'react-refresh/only-export-components': [
      'warn',
      { allowConstantExport: true }
    ],
    'prettier/prettier': [
      'warn',
      { endOfLine: 'auto', trailingComa: 'none', semi: false }
    ]
  }
};
