module.exports = {
  root: true,
  extends: '@react-native-community',
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint'],
  overrides: [
    {
      files: ['*.ts', '*.tsx'],
      rules: {
        'prettier/prettier': 0,
        curly: 0,
        '@typescript-eslint/no-unused-vars': 'warn',
        'react-native/no-inline-styles': 0,
        skipBlankLines: true,
        '@typescript-eslint/no-shadow': ['error'],
        'no-shadow': 'off',
        'no-undef': 'off',
        semi: [2, 'never'],
      },
    },
  ],
};
