import { FlatCompat } from '@eslint/eslintrc';
import pluginReactConfig from 'eslint-plugin-react/configs/recommended.js';
import { dirname } from 'path';
import tseslint from 'typescript-eslint';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
    baseDirectory: __dirname,
});

const eslintConfig = [
    ...compat.extends('next/core-web-vitals', 'next/typescript'),
    ...tseslint.configs.recommended,
    pluginReactConfig,
    {
        rules: {
            'react/react-in-jsx-scope': 'off',
            'react/prop-types': 'off',
        },
    },
];

export default eslintConfig;
