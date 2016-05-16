'use strict';

describe('Service: reverseGeocoder', function () {

  // load the service's module
  beforeEach(module('rowSignsApp'));

  // instantiate service
  var reverseGeocoder;
  beforeEach(inject(function (_reverseGeocoder_) {
    reverseGeocoder = _reverseGeocoder_;
  }));

  it('should do something', function () {
    expect(!!reverseGeocoder).toBe(true);
  });

});
