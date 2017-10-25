/**
 * Created by Kakim on 10.06.2017.
 */
(function () {

    angular
        .module("app")
        .controller("MainPageController", MainPageController);

    MainPageController.$inject = ['$localStorage'];
    function MainPageController($localStorage) {
        var vm = this;
        vm.isAdmin = $localStorage.loginIIN === 12345
    }

})();