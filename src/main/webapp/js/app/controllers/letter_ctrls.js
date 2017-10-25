/**
 * Created by Каким Мерей on 12.04.2017.
 */
angular
    .module("app")
    .controller("LetterController", LetterController);


LetterController.$inject = ['AnnouncementFactory', '$localStorage'];
function LetterController(AnnouncementFactory, $localStorage) {
    var vm = this;
    vm.letterShow = false;
    vm.announcementsShow = false;

    vm.iin = $localStorage.iin;

    vm.getAnnouncement = function () {
        vm.letterShow = false;
        vm.announcementsShow = true;
        getAnnoun(vm.iin);
    };

    vm.getLetter = function () {
        vm.announcementsShow = false;
        vm.letterShow = true;
    };

    function getAnnoun(iin) {
        AnnouncementFactory.getAnnouncements.get({}, function (data) {
            vm.data = data;
        })
    }
}