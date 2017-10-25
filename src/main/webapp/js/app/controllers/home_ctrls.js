/**
 * Created by Каким Мерей on 11.04.2017.
 */
angular
    .module("app")
    .controller("HomeController", HomeController);

HomeController.$inject = ['$stateParams', 'AuthFactory', '$localStorage', 'ngDialog', '$scope'];

function HomeController($stateParams, AuthFactory, $localStorage, ngDialog, $scope) {
    var vm = this;
    vm.iin = null;
    vm.iin = $stateParams.iin;
    $localStorage.iin = vm.iin;
    vm.payer = {};

    vm.now = new Date();

    function getPayer(iin) {
        AuthFactory.getAuthPayer.get({iin: iin}, function (data) {
            vm.payer = data;
        });
    }
    getPayer(vm.iin);
}
