module.exports = {
	eslintIntegration: true,
	printWidth: 100,

	tabWidth: 4,

	useTabs: true,

	semi: true,

	singleQuote: true,

	trailingComma: 'all',

	bracketSpacing: true,

	arrowParens: 'avoid',

	jsxBracketSameLine: true,

	rangeStart: 0,

	rangeEnd: Infinity,

	filepath: 'none',

	requirePragma: false,

	insertPragma: false,

	proseWrap: 'preserve',
	overrides: [
		{
			files: '*.css',
			options: {
				parser: 'css',
			},
		},
		{
			files: '*.js',
			options: {
				parser: 'babel',
			},
		},
		{
			files: '*.scss',
			options: {
				parser: 'scss',
			},
		},
		{
			files: '*.less',
			options: {
				parser: 'less',
			},
		},
		{
			files: '*.json',
			options: {
				parser: 'json',
			},
		},
		{
			files: '*.md',
			options: {
				parser: 'markdown',
			},
		},
		{
			files: '*.vue',
			options: {
				parser: 'vue',
			},
		},
		{
			files: '*.html',
			options: {
				parser: 'html',
			},
		},
	],
};
