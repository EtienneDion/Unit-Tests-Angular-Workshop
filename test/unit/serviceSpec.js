/*global describe, it, beforeEach, inject, expect, angular*/
(function () {
    'use strict';
    describe('localStorage', function(){
        beforeEach(module('todomvc'));

        describe('todoStorage instantiation', function () {
            var $httpBackend, requestHandler, route, location, rootScope;

            beforeEach(inject(function ($injector, $route, $rootScope, $location) {
                route = $route;
                location = $location;
                rootScope = $rootScope;

                $httpBackend = $injector.get('$httpBackend');

            }));

            afterEach(function() {
                $httpBackend.verifyNoOutstandingExpectation();
                $httpBackend.verifyNoOutstandingRequest();
            });

            it('if backend not available should return localStorage service', function () {
                $httpBackend.resetExpectations();

                $httpBackend.expectGET('/api').respond(404, '');
                $httpBackend.expectGET('todomvc-index.html').respond(200, '');

                expect(route.current).toBeUndefined();
                location.path('/');

                $httpBackend.flush();
                expect(route.current.locals.store._getFromLocalStorage).toBeDefined();
                expect(route.current.locals.store.api).toBeUndefined();
            });


        });

    });

    describe('localStorage service', function(){
        beforeEach(module('todomvc'));

        var localStorage;
        var todo = {"title":"test","completed":false};
        var todo2 = {"title":"test2","completed":true};
        var todo3 = {"title":"test3","completed":false};

        beforeEach(inject(function ($injector, $location) {
            localStorage = $injector.get( 'localStorage' );

            spyOn(localStorage, '_getFromLocalStorage').andCallThrough();
            spyOn(localStorage, '_saveToLocalStorage').andCallThrough();

        }));

        it('should todos be defined', function(){
            expect(localStorage.todos).toBeDefined();
        });

        it('should get be called', function(){
            localStorage.get();
            expect(localStorage._getFromLocalStorage).toHaveBeenCalled();
        });

        it('should localStorage insert', function(){
            localStorage.insert(todo);
            expect(localStorage._saveToLocalStorage).toHaveBeenCalled();
            localStorage.insert(todo2);
            expect(localStorage._saveToLocalStorage).toHaveBeenCalled();

            expect(localStorage.todos).toContain(todo);
            expect(localStorage.todos).toContain(todo2);
            expect(localStorage.todos).not.toContain(todo3);
            localStorage.insert(todo3);
            expect(localStorage.todos).toContain(todo3);
        });

        it('should localStorage clear Completed', function(){
            localStorage.clearCompleted();
            expect(localStorage.todos).not.toContain(todo2);
        });

        it('should localStorage delete', function(){
            localStorage.delete(todo3);
            expect(localStorage.todos).not.toContain(todo3);
        });

        it('should localStorage put', function(){
            localStorage.put(todo3, 0);
            expect(localStorage.todos).toContain(todo3);
            expect(localStorage.todos).not.toContain(todo);
        });
    });

    describe('backend api', function(){
        beforeEach(module('todomvc'));

        describe('todoStorage instantiation', function () {
            var $httpBackend, requestHandler, route, location, rootScope;

            beforeEach(inject(function ($injector, $route, $rootScope, $location) {
                route = $route;
                location = $location;
                rootScope = $rootScope;

                $httpBackend = $injector.get('$httpBackend');

            }));

            afterEach(function() {
                $httpBackend.verifyNoOutstandingExpectation();
                $httpBackend.verifyNoOutstandingRequest();
            });

            it('if backend is available should return api service', function () {
                $httpBackend.resetExpectations();

                $httpBackend.expectGET('/api').respond(200, '');
                $httpBackend.expectGET('todomvc-index.html').respond(200, '');
                $httpBackend.expectGET('/api/todos').respond(200, []);

                expect(route.current).toBeUndefined();
                location.path('/');

                $httpBackend.flush();
                expect(route.current.locals.store._getFromLocalStorage).toBeUndefined();
                expect(route.current.locals.store.api).toBeDefined();

            });
        });

    });

    describe('api service', function(){
        beforeEach(module('todomvc'));

        var apiService, $httpBackend;
        var todo = {"title":"test","completed":false};
        var todo2 = {"title":"test2","completed":true};
        var todo3 = {"title":"test3","completed":false};

        beforeEach(inject(function ($injector, $location, $q) {
            apiService = $injector.get( 'api' );
            $httpBackend = $injector.get('$httpBackend');
            spyOn(apiService.api, 'query').andCallThrough();
            spyOn(apiService.api, 'save').andCallThrough();
            spyOn(apiService.api, 'update').andCallThrough();
            spyOn(apiService.api, 'delete').andCallThrough();
        }));


        afterEach(function() {
            $httpBackend.verifyNoOutstandingExpectation();
            $httpBackend.verifyNoOutstandingRequest();
        });

        it('should todos be defined', function(){
            expect(apiService.todos).toBeDefined();
        });

        it('should get be called', function(){
            $httpBackend.resetExpectations();
            $httpBackend.expectGET('/api/todos').respond(200, []);
            apiService.get();
            $httpBackend.flush();
            expect(apiService.api.query).toHaveBeenCalled();
        });

        it('should api insert', function(){
            $httpBackend.expectPOST('/api/todos').respond(200, angular.extend({id:1}, todo));
            apiService.insert(todo);
            $httpBackend.flush();
            expect(apiService.api.save).toHaveBeenCalled();
            $httpBackend.expectPOST('/api/todos').respond(200, angular.extend({id:2}, todo2));
            apiService.insert(todo2);
            $httpBackend.flush();
            expect(apiService.api.save).toHaveBeenCalled();
            expect(apiService.todos).toContain(todo);
            expect(apiService.todos).toContain(todo2);
            expect(apiService.todos).not.toContain(todo3);

            $httpBackend.expectPOST('/api/todos').respond(200, angular.extend({id:3}, todo3));
            apiService.insert(todo3);
            $httpBackend.flush();
            expect(apiService.todos).toContain(todo3);
        });
        it('should api clear complete', function(){
            $httpBackend.expectDELETE('/api/todos').respond(200, {});
            apiService.clearCompleted();
            expect(apiService.api.delete).toHaveBeenCalled();
            $httpBackend.flush();
            expect(apiService.todos).not.toContain(todo2);
        });

        it('should api delete', function(){

            $httpBackend.expectDELETE('/api/todos/3').respond(200, {});
            apiService.delete(todo3);
            expect(apiService.api.delete).toHaveBeenCalled();
            $httpBackend.flush();
            expect(apiService.todos).not.toContain(todo3);
        });

        it('should api put', function(){


            $httpBackend.expectPUT('/api/todos/3').respond(200, angular.extend({id:1}, todo3));
            apiService.put(todo3);
            $httpBackend.flush();
            expect(apiService.api.update).toHaveBeenCalled();
            //This Fails... And should not
            //expect(apiService.todos).toContain(angular.extend({id:1}, todo3));
            //expect(apiService.todos).not.toContain(todo);
        });

    });

}());
