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

			compile(el)(scope);
			expect(browser.deferredFns.length).toBe(0);

			scope.$apply(function () {
				scope.focus = true;
			});

			expect(browser.deferredFns.length).toBe(1);
			timeout.flush();
			expect(browser.deferredFns.length).toBe(0);


		});
	});

	describe('todoEscape directive', function () {

		beforeEach(module('todomvc'));
		var scope, compile, spy;

		beforeEach(inject(function ($rootScope, $compile, $browser, $timeout) {
			scope = $rootScope.$new();
			scope.testFunc = function(param){
				console.log("test", param);
			};
			spy = spyOn(scope, 'testFunc');

			compile = $compile;
		}));

		it('should focus on truthy expression', function () {

			var el = angular.element('<input todo-escape="testFunc(\'test\')" >');

			compile(el)(scope);

			angular.element(el).triggerHandler({type:'keydown', which:27, keyCode:27});

			expect(spy).toHaveBeenCalled();

		});
	});
}());


