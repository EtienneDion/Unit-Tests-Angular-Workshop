/*global describe, it, beforeEach, inject, expect, angular*/
(function () {
	'use strict';

	beforeEach(module('todomvc'));

	describe('todoFocus directive', function () {
		var scope, compile, browser;

		beforeEach(inject(function ($rootScope, $compile, $browser) {
			scope = $rootScope.$new();
			compile = $compile;
		}));

		it('should focus on truthy expression', function () {
			var el = angular.element('<input todo-focus="focus">');

		});
	});
}());
