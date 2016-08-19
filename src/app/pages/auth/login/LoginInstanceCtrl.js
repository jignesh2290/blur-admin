/**
 * @author v.lugovsky
 * created on 16.12.2015
 */
(function () {
  'use strict';
      angular.module('BlurAdmin.pages.dashboard')
    .controller('LoginInstanceCtrl', LoginInstanceCtrl);

  /** @ngInject */
      function LoginInstanceCtrl($scope, $uibModalInstance, $state, toastr, authService) {
        $scope.message = '';
        $scope.showRegister = function () {
            $scope.closeModal(false);
        }

        $scope.closeModal = function (isRegistered) {
            $uibModalInstance.close(isRegistered);
        };

        $scope.loginData = {
            userName: "",
            password: "",
            useRefreshTokens: false
        };

        $scope.login = function () {
            toastr.info('Logging in', 'Please wait...');

            authService.login($scope.loginData).then(function (response) {
                toastr.clear();
                toastr.success('You\'re now logged in', 'Welcome back, ' + authService.authentication.userName);
                $scope.closeModal(true);
                $state.go('dashboard');
            },
             function (err) {
                 toastr.clear();
                 $scope.message = err.error_description;
                 //toastr.error($scope.message, 'Failed to login');
             });
        };

        $scope.authExternalProvider = function (provider) {

            var redirectUri = location.protocol + '//' + location.host + '/authcomplete.html';

            var externalProviderUrl = ngAuthSettings.apiServiceBaseUri + "api/Account/ExternalLogin?provider=" + provider
                                                                        + "&response_type=token&client_id=" + ngAuthSettings.clientId
                                                                        + "&redirect_uri=" + redirectUri;
            window.$windowScope = $scope;

            var oauthWindow = window.open(externalProviderUrl, "Authenticate Account", "location=0,status=0,width=600,height=750");
        };

        $scope.authCompletedCB = function (fragment) {

            $scope.$apply(function () {

                if (fragment.haslocalaccount == 'False') {

                    authService.logOut();

                    authService.externalAuthData = {
                        provider: fragment.provider,
                        userName: fragment.external_user_name,
                        externalAccessToken: fragment.external_access_token
                    };

                    $location.path('/associate');

                }
                else {
                    //Obtain access token and redirect to orders
                    var externalData = { provider: fragment.provider, externalAccessToken: fragment.external_access_token };
                    authService.obtainAccessToken(externalData).then(function (response) {

                        $location.path('/orders');

                    },
                 function (err) {
                     $scope.message = err.error_description;
                 });
                }

            });
        }
    };

})();
