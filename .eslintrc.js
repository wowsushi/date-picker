module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  plugins: ['prettier'],
  extends: ['react-app', 'react-app/jest', 'prettier'],
  overrides: [
    {
      env: {
        node: true,
      },
      files: ['.eslintrc.{js,cjs}'],
      parserOptions: {
        sourceType: 'script',
      },
    },
    {
      files: ['*.ts', '*.tsx', '*.js', '*.jsx'],
      rules: {
        'prettier/prettier': ['warn', { semi: false }],
      },
    },
    {
      files: ['*.spec.ts', '*.spec.tsx', '*.spec.js', '*.spec.jsx'],
      env: {
        jest: true,
      },
      rules: {},
    },
  ],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  rules: {
    'react/jsx-uses-react': 'off',
    'react/react-in-jsx-scope': 'off',
    'react/no-array-index-key': 'off',
  },
}
