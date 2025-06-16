// @ts-nocheck

import globals from 'globals';
import tseslint from 'typescript-eslint';
import pluginReact from 'eslint-plugin-react';
import pluginTypescript from '@typescript-eslint/eslint-plugin';
import pluginQuery from '@tanstack/eslint-plugin-query';
import pluginPromise from 'eslint-plugin-promise';
import pluginHooks from 'eslint-plugin-react-hooks';
import { dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import stylisticTs from '@stylistic/eslint-plugin-ts';

const __dirname = dirname(fileURLToPath(import.meta.url));

const config = [
    pluginReact.configs.flat.recommended, // This is not a plugin object, but a shareable config object
    pluginReact.configs.flat['jsx-runtime'], // Add this if you are using React 17+
    ...pluginQuery.configs['flat/recommended'],
    pluginPromise.configs['flat/recommended'],
    {
        files: ['**/*.{js,mjs,cjs,ts,jsx,tsx}'],
        ignores: [
            'node_modules',
            '@types',
            'dist',
            'coverage',
            'webpack.*',
            'versionScript.ts',
            'version.ts',
            'eslint.config.mjs',
        ],
    },
    {
        languageOptions: {
            globals: globals.browser,
            parser: tseslint.parser,
            parserOptions: {
                project: true,
                tsconfigRootDir: __dirname,
                sourceType: 'module',
                'allowImportExportEverywhere': true,
            },
        },
    },
    {
        settings: {
            'react': {
                'createClass': 'createReactClass',
                'pragma': 'React',
                'fragment': 'Fragment',
                'version': 'detect',
            },
        },
    },
    {
        plugins: {
            'react': pluginReact,
            '@typescript-eslint': pluginTypescript,
            '@tanstack/query': pluginQuery,
            'promise': pluginPromise,
            'react-hooks': pluginHooks,
            '@stylistic/ts': stylisticTs,
        },
    },
    {
        rules: {
            ...pluginReact.configs.flat.recommended.rules,
            ...pluginHooks.configs.recommended.rules,
            ...pluginTypescript.configs['recommended'].rules,
            ...pluginTypescript.configs['eslint-recommended'].rules,
            'quotes': ['error', 'single'],
            'jsx-quotes': ['error', 'prefer-single'],
            'semi': ['error', 'always'],
            'indent': ['error', 4, {'SwitchCase': 1}],
            '@typescript-eslint/array-type': ['error', { 'default': 'generic' }],
            '@typescript-eslint/await-thenable': 'error',
            'react/jsx-uses-vars': 'error',
            'react/prop-types': 'off',
            'comma-dangle': ['error', 'always-multiline'],
            '@typescript-eslint/explicit-module-boundary-types': 'off',
            '@typescript-eslint/explicit-function-return-type': 'warn',
            'no-unused-vars': 'off', // Needs to be disabled for rule below.
            '@typescript-eslint/no-unused-vars': ['error', { 'varsIgnorePattern': '^_', 'argsIgnorePattern': '^_' }],
            '@typescript-eslint/no-unused-expressions': ['error', { 'allowShortCircuit': false, 'allowTernary': false }],
            '@stylistic/ts/member-delimiter-style': ['error'],
            '@typescript-eslint/no-empty-interface': 'off',
            '@typescript-eslint/no-extra-non-null-assertion': ['error'],
            '@typescript-eslint/no-unnecessary-boolean-literal-compare': 'error',
            '@typescript-eslint/no-unnecessary-condition': 'error',
            '@typescript-eslint/prefer-optional-chain': 'warn',
            '@stylistic/ts/type-annotation-spacing': ['error', { 'before': true, 'after': true }],
            '@typescript-eslint/ban-ts-comment': 'warn',
            'no-fallthrough': 'warn',
            'react/display-name': 'off',
            'no-multi-spaces': ['error'],
            'comma-spacing': ['error', { 'before': false, 'after': true }],
            'space-in-parens': ['error', 'never'],
            'semi-spacing': ['error', {'before': false, 'after': true}],
            'space-before-blocks': ['error', 'always'],
            'space-infix-ops': ['error'],
            'keyword-spacing': ['error'],
            'key-spacing': ['error', { 'beforeColon': false, 'afterColon': true }],
            'no-console': ['error', { 'allow': ['warn', 'error'] }],
            '@typescript-eslint/no-shadow': 'error',
            '@tanstack/query/exhaustive-deps': 'error',
            '@tanstack/query/no-rest-destructuring': 'warn',
            '@tanstack/query/stable-query-client': 'error',
            'promise/no-return-in-finally': 'warn',
            'promise/catch-or-return': ['error', { 'allowFinally': true }],
        },
    },
];

export default config;