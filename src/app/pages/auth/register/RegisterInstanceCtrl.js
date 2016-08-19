/**
 * @author v.lugovsky
 * created on 16.12.2015
 */
(function () {
  'use strict';

  angular.module('BlurAdmin.pages.dashboard')
  .controller('RegisterInstanceCtrl', RegisterInstanceCtrl);

  /** @ngInject */
  function RegisterInstanceCtrl($scope, $uibModalInstance, $state, $location, $timeout, authService, toastr) {
      $scope.showLogin = function () {
          $scope.closeModal(true);
      }

      $scope.savedSuccessfully = false;
      $scope.message = "";

      $scope.registration = {
          Email: "",
          UserName: "",
          Password: "",
          ConfirmPassword: ""
      };

      $scope.signUp = function () {
          toastr.info('Registering user', 'Please wait...');

          authService.saveRegistration($scope.registration).then(function (response) {

              $scope.savedSuccessfully = true;
              toastr.success('Registered successfully, you will be redicted to login page in 2 seconds.', 'Register success');

              startTimer();

          },
           function (response) {
               var errors = [];
               for (var key in response.data.modelState) {
                   for (var i = 0; i < response.data.modelState[key].length; i++) {
                       errors.push(response.data.modelState[key][i]);
                   }
               }
               $scope.inError = true;
               toastr.error(errors.join(' '), 'Failed to register');
               $scope.message = "Failed to register user due to:" + errors.join(' ');
           });
      };

      var startTimer = function () {
          var timer = $timeout(function () {
              $timeout.cancel(timer);
              $scope.closeModal(true);
          }, 2000);
      }

      $scope.closeModal = function (isRegistered) {
          $uibModalInstance.close(isRegistered);
      };
  };
})();
