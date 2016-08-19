/**
 * @author v.lugovksy
 * created on 16.12.2015
 */
(function () {
  'use strict';

  angular.module('BlurAdmin.theme.components')
    .controller('PageTopCtrl', PageTopCtrl);

  /** @ngInject */
  function PageTopCtrl($scope, authService, $state, toastr) {
      $scope.logout = function () {
          //toastr.info('Logged out.');
          authService.logOut();
          if ($state.current.name == 'dashboard') {
              $state.reload();
          }
          else {
              $state.go('dashboard');
          }
      };
  }
})();