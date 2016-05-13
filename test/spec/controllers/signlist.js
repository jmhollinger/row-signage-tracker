'use strict';

describe('Controller: SignlistCtrl', function () {

  // load the controller's module
  beforeEach(module('rowSignsApp'));

  var SignlistCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    SignlistCtrl = $controller('SignlistCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(SignlistCtrl.awesomeThings.length).toBe(3);
  });
});
