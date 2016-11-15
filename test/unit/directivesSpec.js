/*global describe, it, beforeEach, inject, expect, angular*/
(function () {
	'use strict';



	describe('todoFocus directive', function () {

		beforeEach(module('todomvc'));

		var scope, compile, browser, timeout;

		beforeEach(inject(function ($rootScope, $compile, $browser, $timeout) {
			scope = $rootScope.$new();
			compile = $compile;
			timeout = $timeout;
			browser = $browser;
		}));

		it('should focus on truthy expression', function () {
			var el = angular.element('<input todo-focus="focus">');
			scope.focus = false;
			//browser.deferredFns.length

			//timeout.flush();

		});
	});

	describe('todoEscape directive', function () {

		beforeEach(module('todomvc'));
		var scope, compile, spy;

		beforeEach(inject(function ($rootScope, $compile, $browser, $timeout) {
			scope = $rootScope.$new();
			scope.testFunc = function(param){};
			spy = spyOn(scope, 'testFunc');

		}));

		it('should focus on truthy expression', function () {

			var el = angular.element('<input todo-escape="testFunc(\'test\')" >');

			//angular.element(el).triggerHandler({});



		});
	});

}());
