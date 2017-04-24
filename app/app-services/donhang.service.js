(function () {
    'use strict';

    angular
        .module('BlurAdmin.pages')
        .factory('DonhangService', Service);

    function Service($http, $q) {
        var service = {};

        service.GetAll = GetAll;
        service.GetInfoById = GetInfoById;
        service.GetByUsername = GetByUsername;
        service.GetCuahangnhans = GetCuahangnhan;
        service.CreateDonhang = CreateDonhang;
        service.UpdateDonhang = UpdateDonhang;

        return service;

        function GetCurrent() {
            return $http.get('/api/users/current').then(handleSuccess, handleError);
        }

        function GetAll(_phuthuoc) {
            return $http.get('/api/donhangs/' + _phuthuoc).then(handleSuccess, handleError);
        }

        function GetInfoById(_id) {
            return $http.get('/api/cuahangs/getById/' + _id).then(handleSuccess, handleError);
        }

        function GetByUsername(username) {
            return $http.get('/api/users/' + username).then(handleSuccess, handleError);
        }
        
        function GetCuahangnhan(_phuthuoc) {
            return $http.get('/api/cuahangs/cuahangnhan' + _phuthuoc).then(handleSuccess, handleError);
        }

        function CreateDonhang(donhang) {
            return $http.post('/api/donhangs/createdonhang', donhang).then(handleSuccess, handleError);
        }

        function UpdateDonhang(cuahang) {
            return $http.put('/api/cuahangs/updatebasicinfo/' + cuahang._id, cuahang).then(handleSuccess, handleError);
        }

        function UpdateSanphamInfo(cuahang) {
            return $http.put('/api/cuahangs/updatesanphaminfo/' + cuahang._id, cuahang).then(handleSuccess, handleError);
        }

        function Delete(_id) {
            return $http.delete('/api/users/' + _id).then(handleSuccess, handleError);
        }

        // private functions

        function handleSuccess(res) {
            return res.data;
        }

        function handleError(res) {
            return $q.reject(res.data);
        }
    }

})();
