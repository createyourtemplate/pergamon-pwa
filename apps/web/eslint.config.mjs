import withNuxt from './.nuxt/eslint.config.mjs';
import { architecture, ecma } from '@vue-storefront/eslint-config';
import pluginVueA11y from 'eslint-plugin-vuejs-accessibility';
import { noI18nGlobals } from './eslint-rules/no-i18n-globals.js';
import pluginEtc from 'eslint-plugin-etc';
import pluginPromise from 'eslint-plugin-promise';
import pluginSonar from 'eslint-plugin-sonarjs';
import pluginUnicorn from 'eslint-plugin-unicorn';
import tsParser from '@typescript-eslint/parser';

export default withNuxt(
  { ignores: ['**/__mocks__/**'] },
  architecture({
    maxComplexity: 100,
    maxDepth: 5,
    maxStatementsPerLine: 1,
    maxLines: 500,
    maxLinesPerFunction: 1000,
    maxStatements: 150,
    maxNestedCallbacks: 30,
    maxParams: 4,
  }),
  ecma({ withImport: false }),
  ...pluginVueA11y.configs['flat/recommended'],
  {
    plugins: {
      'custom-rules': {
        rules: {
          'no-i18n-globals': noI18nGlobals,
        },
      },
      promise: pluginPromise,
      sonarjs: pluginSonar,
      unicorn: pluginUnicorn,
    },
    rules: {
      'arrow-parens': ['error', 'always'],
      'no-console': ['error'],
      'no-constant-binary-expression': 'off',
      '@typescript-eslint/no-unused-expressions': ['error', { allowTernary: true }],
      'vue/no-console': ['error'],
      'vue/no-multiple-template-root': 'off',
      'vue/no-v-html': 'off',
      'vue/html-self-closing': ['error', { html: { void: 'always' } }],
      'vuejs-accessibility/click-events-have-key-events': 'off',
      'vuejs-accessibility/form-control-has-label': 'off',
      'vuejs-accessibility/label-has-for': 'off',
      'vuejs-accessibility/mouse-events-have-key-events': 'off',
      'vuejs-accessibility/no-autofocus': 'off',
      'vuejs-accessibility/no-redundant-roles': 'off',
      'vuejs-accessibility/no-static-element-interactions': 'off',
      'custom-rules/no-i18n-globals': 'error',
      'promise/no-nesting': 'warn',
      'sonarjs/cognitive-complexity': ['warn', 15],
      'sonarjs/no-identical-functions': 'warn',
      'unicorn/consistent-function-scoping': 'warn',
      'unicorn/expiring-todo-comments': 'off',
      'unicorn/no-thenable': 'error',
      'unicorn/prefer-add-event-listener': 'warn',
    },
  },
  {
    files: ['apps/web/**/*.{ts,tsx,vue}'],
    languageOptions: {
      parser: tsParser,
      parserOptions: {
        project: ['./apps/web/tsconfig.json'],
        tsconfigRootDir: process.cwd(),
        sourceType: 'module',
      },
    },
    plugins: {
      etc: pluginEtc,
    },
    rules: {
      'etc/no-implicit-any-catch': 'error',
      'etc/throw-error': 'error',
    },
  },
);
