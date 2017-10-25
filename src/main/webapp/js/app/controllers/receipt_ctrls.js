/**
 * Created by Kakim on 10.06.2017.
 */
(function () {
    angular
        .module("app")
        .controller("ReceiptController", ReceiptController);

    ReceiptController.$inject = ['AuthFactory', 'PokazanieFactory', '$localStorage', 'PaymentFactory'];
    function ReceiptController(AuthFactory, PokazanieFactory, $localStorage, PaymentFactory) {
        var vm = this;
        var iin = $localStorage.iin;
        vm.payer = {};
        vm.electrPayMoneyMonth = 45.12;
        vm.gvs = {
            gvsPayMoneyInMonth : 65.68,
            name: 'ГВС'

        };
        getPayer = function () {
            AuthFactory.getAuthPayer.get({iin: iin}, function (data) {
                vm.payer = data;
                getReceipt(vm.payer);
            });
        };

        getReceipt = function (payer) {
            PokazanieFactory.receiptWater.getWater({payerID: payer.id}, function (data) {
                vm.waterPokazanie = data;
                vm.waterPokazanie.payment = data.indication;
                vm.sum1 = parseInt(getSum1(vm.waterPokazanie));
            });
            PokazanieFactory.receiptElectr.getElectr({payerID: payer.id}, function (data) {
                vm.electrPokazanie = data;
                vm.electrPokazanie.payment = data.indication;
                vm.sum2 = parseInt(getSum2(payer, vm.electrPokazanie));
            })
        };

        getReceiptID = function () {
            PokazanieFactory.receiptID.getID({}, function (data) {
                var id = data;
                savePayment(id);
            });
        };

        function savePayment(id) {
            PaymentFactory.payment.pay({iin: iin}, vm.payObject, function (data) {

            });

        }


        //Вызов мусора
        vm.garbageRemoval = {
            name : "Вызов мусора",
            payment : 756.2,
            value : 259.2
        };

        //видеонаблюдение
        vm.cctv = {
            name: "Видеонаблюдение",
            payment: 500.00,
            value: 500.00
        };


        function getSum1(waterPokazanie) {
            return parseInt((waterPokazanie.payment * vm.gvs.gvsPayMoneyInMonth).toFixed(2));
        }

        function getSum2(payer, electrPokazanie) {
            var electr = parseInt((vm.electrPayMoneyMonth * electrPokazanie.payment));
            var garbage = parseInt((vm.garbageRemoval.value * payer.numberOfPersons).toFixed(2));
            var cctv = parseInt(vm.cctv.value);
            var gvs = parseInt((vm.gvs.gvsPayMoneyInMonth * payer.numberOfPersons).toFixed(2));
            var sum = (gvs + electr + garbage + cctv);
            return parseInt(sum);
        };

        vm.payObject = {
            personalAccount: null,
            amountToGrid: null,
            paymentSelect: null
        };

        vm.pay = function () {
            vm.showPayment = !vm.showPayment;
            getPayer();
            if (vm.payObject.personalAccount != vm.payer.personalAccount && vm.payObject.personalAccount) {
                window.alert('Лицевой счет неправильно!');
            }


        };


        vm.tovar = ['Электричество', 'Вода'];


        function init() {
            getPayer();
            getReceiptID();
        }

        init();
    }

})();