/* global require, module */

var Angular2App = require('angular-cli/lib/broccoli/angular2-app');

module.exports = function(defaults) {
  return new Angular2App(defaults, {
    vendorNpmFiles: [
      'systemjs/dist/system-polyfills.js',
      'systemjs/dist/system.src.js',
      'zone.js/dist/*.js',
      'es6-shim/es6-shim.js',
      'reflect-metadata/*.js',
      'rxjs/**/*.js',
      '@angular/**/*.js',
      'moment/moment.js',
      'angular2-jwt/angular2-jwt.js',
      '@ngrx/**/*.js',
      '@angular2-material/**/*.js',
      'ng2-material/**/*.js',
      'ng2-toastr/ng2-toastr.js'
    ]
  });
};
