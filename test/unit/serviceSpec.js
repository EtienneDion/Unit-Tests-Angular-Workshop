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

        });

        it('should get be called', function(){
            localStorage.get();
            
        });

        it('should localStorage insert', function(){

        });

        it('should localStorage clear Completed', function(){

        });

        it('should localStorage delete', function(){

        });

        it('should localStorage put', function(){

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

        });

        it('should api clear complete', function(){

        });

        it('should api delete', function(){

        });

        it('should api put', function(){

        });

    });

}());
