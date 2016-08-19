'use strict';

//var serviceBase = 'http://localhost:26264/';
var serviceAuthBase = 'http://casting-dev-auth.azurewebsites.net/';
var serviceBase = 'http://casting-dev-api.azurewebsites.net/';

angular.module('BlurAdmin', [
  'ngAnimate',
  'ui.bootstrap',
  'ui.sortable',
  'ui.router',
  'ngTouch',
  'toastr',
  'smart-table',
  "xeditable",
  'ui.slimscroll',
  'ngJsTree',
  'angular-progress-button-styles',
  'LocalStorageModule',

  'BlurAdmin.theme',
  'BlurAdmin.pages'
])

.constant('ngAuthSettings', {
    apiServiceBaseUri: serviceBase,
    apiAuthBaseUri: serviceAuthBase,
    clientId: 'ngAuthApp'
})
.config(function ($httpProvider) {
    $httpProvider.interceptors.push('authInterceptorService');
})
.run(['authService', function (authService) {
    authService.fillAuthData();
}]);
