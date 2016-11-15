module.exports = function (config) {
	'use strict';

	config.set({
		basePath: '../../',
		frameworks: ['jasmine'],
		files: [
			'node_modules/angular/angular.js',
			'node_modules/angular-route/angular-route.js',
			'node_modules/angular-resource/angular-resource.js',
			'node_modules/angular-mocks/angular-mocks.js',
			'js/**/*.js',
			'test/unit/**/*.js'
		],
		reporters: ['progress', 'coverage'],
		preprocessors: {
			// source files, that you wanna generate coverage for
			// do not include tests or libraries
			// (these files will be instrumented by Istanbul)
			'js/**/*.js': ['coverage']
		},
		coverageReporter: {
			type : 'html',
			dir : 'coverage/'
		},
		autoWatch: true,
		singleRun: true,
		browsers: ['Chrome']
	});
};
