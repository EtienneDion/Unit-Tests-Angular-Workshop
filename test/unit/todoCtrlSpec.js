/*global describe, it, beforeEach, inject, expect*/
(function () {
	'use strict';

	describe('Todo Controller', function () {
		var ctrl, scope, store;

		// Load the module containing the app, only 'ng' is loaded by default.
		beforeEach(module('todomvc'));

		beforeEach(inject(function ($controller, $rootScope, localStorage) {
			scope = $rootScope.$new();

			store = localStorage;

			localStorage.todos = [];
			localStorage._getFromLocalStorage = function () {
				return [];
			};
			localStorage._saveToLocalStorage = function (todos) {
				localStorage.todos = todos;
			};

			ctrl = $controller('TodoCtrl', {
				$scope: scope,
				store: store
			});
		}));

		it('should Todo be defined on start', function () {
			//scope.todos
		});

		it('should not have an edited Todo on start', function () {
			//scope.editedTodo
		});

		it('should not have any Todos on start', function () {
			//scope.todos.length
		});

		it('should have all Todos completed', function () {
			scope.$digest();
			//scope.allChecked
		});

		describe('the filter', function () {
			it('should default to ""', function () {
				scope.$emit('$routeChangeSuccess');
				//scope.status
				//scope.statusFilter
			});

			describe('being at /active', function () {
				it('should filter non-completed', inject(function ($controller) {
					ctrl = $controller('TodoCtrl', {
						$scope: scope,
						store: store,
						$routeParams: {
							status: 'active'
						}
					});

					scope.$emit('$routeChangeSuccess');
					//scope.statusFilter.completed
				}));
			});

			describe('being at /completed', function () {
				it('should filter completed', inject(function ($controller) {
					ctrl = $controller('TodoCtrl', {
						$scope: scope,
						$routeParams: {
							status: 'completed'
						},
						store: store
					});

					scope.$emit('$routeChangeSuccess');
					//scope.statusFilter.completed
				}));
			});
		});

		describe('having no Todos', function () {
			var ctrl;

			beforeEach(inject(function ($controller) {
				ctrl = $controller('TodoCtrl', {
					$scope: scope,
					store: store
				});
				scope.$digest();
			}));

			it('should not add empty Todos', function () {
				scope.newTodo = '';
				scope.addTodo();
				scope.$digest();
				//scope.todos.length
			});

			it('should not add items consisting only of whitespaces', function () {
				scope.newTodo = '   ';
				scope.addTodo();
				scope.$digest();
				//scope.todos.length
			});


			it('should trim whitespace from new Todos', function () {
				scope.newTodo = '  buy some unicorns  ';
				scope.addTodo();
				scope.$digest();
				//scope.todos.length
				//scope.todos[0].title
			});
		});

		describe('having some saved Todos', function () {
			var ctrl;

			beforeEach(inject(function ($controller) {
				ctrl = $controller('TodoCtrl', {
					$scope: scope,
					store: store
				});

				store.insert({ title: 'Uncompleted Item 0', completed: false });
				store.insert({ title: 'Uncompleted Item 1', completed: false });
				store.insert({ title: 'Uncompleted Item 2', completed: false });
				store.insert({ title: 'Completed Item 0', completed: true });
				store.insert({ title: 'Completed Item 1', completed: true });
				store.insert({ title: 'Completed Item 2', completed: true });
				store.insert({ title: 'Completed Item 3', completed: true });
				scope.$digest();
			}));

			it('should count Todos correctly', function () {
				//scope.todos.length
				//scope.remainingCount
				//scope.completedCount
				//scope.allChecked
			});

			it('should save Todos to local storage', function () {
				//scope.todos.length
			});

			it('should remove Todos w/o title on saving', function () {
				var todo = store.todos[2];
				scope.editTodo(todo);
				todo.title = '';
				scope.saveEdits(todo);
				//scope.todos.length
			});

			it('should trim Todos on saving', function () {
				var todo = store.todos[0];
				scope.editTodo(todo);
				todo.title = ' buy moar unicorns  ';
				scope.saveEdits(todo);
				//scope.todos[0].title
			});

			it('clearCompletedTodos() should clear completed Todos', function () {
				scope.clearCompletedTodos();
				//scope.todos.length
			});

			it('markAll() should mark all Todos completed', function () {
				scope.markAll(true);
				scope.$digest();
				//scope.completedCount
			});

			it('revertTodo() get a Todo to its previous state', function () {
				var todo = store.todos[0];
				scope.editTodo(todo);
				todo.title = 'Unicorn sparkly skypuffles.';
				scope.revertEdits(todo);
				scope.$digest();
				//scope.todos[0].title

			});

			it('removeTodo()', function () {

			});

			it('saveTodo()', function () {

			});

		});
	});
}());
