/**
 * Created by Kakim on 10.06.2017.
 */
(function () {

    angular
        .module("app")
        .controller("PdfDownloader", PdfDownloader);

    PdfDownloader.$inject = ['PdfFactory'];
    function PdfDownloader(PdfFactory) {
        var vm = this;

        vm.downloadPDF = function () {
            PdfFactory.pdf.download({}, function (data) {
                vm.pdf = data;
            })

        };

    }

})();