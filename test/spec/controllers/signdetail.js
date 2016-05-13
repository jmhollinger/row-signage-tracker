'use strict';

describe('Controller: SigndetailCtrl', function () {

  // load the controller's module
  beforeEach(module('rowSignsApp'));

  var SigndetailCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    SigndetailCtrl = $controller('SigndetailCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(SigndetailCtrl.awesomeThings.length).toBe(3);
  });
});
