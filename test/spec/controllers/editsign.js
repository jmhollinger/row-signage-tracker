'use strict';

describe('Controller: EditsignCtrl', function () {

  // load the controller's module
  beforeEach(module('rowSignsApp'));

  var EditsignCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    EditsignCtrl = $controller('EditsignCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(EditsignCtrl.awesomeThings.length).toBe(3);
  });
});
