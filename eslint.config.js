import js from '@eslint/js';
import tsPlugin from '@typescript-eslint/eslint-plugin';
import tsParser from '@typescript-eslint/parser';
import vuePlugin from 'eslint-plugin-vue';
import vueParser from 'vue-eslint-parser';
import globals from 'globals';

// Базовые настройки
const baseConfig = {
  languageOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    globals: {
      ...globals.browser,
    },
  },
};

export default [
  // Базовые рекомендации
  js.configs.recommended,

  // Общие настройки для всех файлов
  {
    ...baseConfig,
    rules: {
      'no-redeclare': 'off',
      'no-undef': 'off',
      indent: 'off',
      'import/no-relative-parent-imports': 'off',
    },
  },

  // TypeScript настройки
  {
    files: ['**/*.ts', '**/*.js'],
    languageOptions: {
      parser: tsParser,
    },
    plugins: {
      '@typescript-eslint': tsPlugin,
    },
    rules: {
      '@typescript-eslint/no-unused-vars': 'warn',
      '@typescript-eslint/no-explicit-any': 'off',
      'import/no-relative-parent-imports': 'off',
    },
  },

  // Vue настройки
  {
    files: ['**/*.vue'],
    languageOptions: {
      parser: vueParser,
      parserOptions: {
        parser: tsParser,
      },
    },
    plugins: {
      vue: vuePlugin,
    },
    rules: {
      'vue/no-unused-vars': 'warn',
      'vue/html-indent': 'off',
      'vue/script-indent': 'off',
      'vue/multi-word-component-names': 'off',
      'import/no-relative-parent-imports': 'off',
    },
  },
];
