module.exports = {
	root: true,
	parser: 'vue-eslint-parser',
	parserOptions: {
		ecmaVersion: 2018,
		sourceType: 'module',
		parser: '@babel/eslint-parser',
		requireConfigFile: false,
	},
	env: {
		browser: true,
		es6: true,
		node: true,
	},
	globals: {
		Promise: false,
		process: false,
	},
	extends: [
		'eslint:recommended',
		'plugin:vue/recommended',
		'plugin:vue/essential',
		'plugin:prettier/recommended',
	],
	plugins: ['vue'],
	rules: {
		'space-before-blocks': [2, 'always'],
		'no-empty': ['error', { allowEmptyCatch: true }],
		curly: [2, 'all'],
		semi: [2, 'always'],
		'block-scoped-var': 'error',
		'consistent-return': 0,
		'no-extra-semi': 2,
		'no-debugger': 2,
		'vue/attributes-order': 0,
		'no-useless-escape': 0,
		'no-unused-vars': 2,
		'vue/no-v-for-template-key': 0,
		'vue/no-multiple-template-root': 0,
		'vue/no-v-model-argument': 0,
	},
};