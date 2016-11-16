(function () {
    'use strict';

    beforeEach(module('todomvc'));

    describe('route', function () {

        it('Should load route', inject(function ($route) {
            expect($route.routes['/'].controller).toBe('TodoCtrl');
            expect($route.routes['/:status'].controller).toBe('TodoCtrl');
            expect($route.routes[null].redirectTo).toBe('/');
        }));

    });
}());
