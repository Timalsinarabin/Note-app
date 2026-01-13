module.exports = {
	globDirectory: '.',
	globPatterns: [
		'**/*.{css,json,js,html,svg}'
	],
	swDest: 'sw.js',
	ignoreURLParametersMatching: [
		/^utm_/,
		/^fbclid$/,
		/^source/
	]
};