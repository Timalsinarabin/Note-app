module.exports = {
	globDirectory: '.',
	globPatterns: [
		'**/*.{css,json,png,js,html,jpg}'
	],
	swDest: 'sw.js',
	ignoreURLParametersMatching: [
		/^utm_/,
		/^fbclid$/,
		/^q/
	]
};