import { configs } from '@eslint/js';

export default [
	configs.recommended,
	{
		languageOptions: {
			ecmaVersion: 'latest',
		},
		rules: {
			'no-console': 'off',
			'object-curly-spacing': ['error', 'always'],
            'prefer-const': 'off',
			quotes: ['error', 'single'],
			semi: ['error', 'always'],
            '@typescript-eslint/no-unused-vars': 'off',
            '@typescript-eslint/no-explicit-any': 'off',
		},
	},
];