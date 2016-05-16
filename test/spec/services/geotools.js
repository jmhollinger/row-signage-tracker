'use strict';

describe('Service: geoTools', function () {

  // load the service's module
  beforeEach(module('rowSignsApp'));

  // instantiate service
  var geoTools;
  beforeEach(inject(function (_geoTools_) {
    geoTools = _geoTools_;
  }));

  it('should do something', function () {
    expect(!!geoTools).toBe(true);
  });

});
