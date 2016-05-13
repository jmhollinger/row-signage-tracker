'use strict';

describe('Controller: NewsignCtrl', function () {

  // load the controller's module
  beforeEach(module('rowSignsApp'));

  var NewsignCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    NewsignCtrl = $controller('NewsignCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(NewsignCtrl.awesomeThings.length).toBe(3);
  });
});
