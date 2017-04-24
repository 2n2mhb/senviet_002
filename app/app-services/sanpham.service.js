(function () {
    'use strict';

    angular
        .module('BlurAdmin.pages')
        .factory('SanphamService', Service);

    function Service($http, $q) {
        var service = {};

        service.GetCurrent = GetCurrent;
        service.GetAll = GetAll;
        service.GetInfoById = GetInfoById;
        service.GetByUsername = GetByUsername;
        service.CreateBasicInfo = CreateBasicInfo;
        service.UpdateBasicInfo = UpdateBasicInfo;
        service.Delete = Delete;

        return service;

        function GetCurrent() {
            return $http.get('/api/users/current').then(handleSuccess, handleError);
        }

        function GetAll(_phuthuoc) {
            return $http.get('/api/sanphams/' + _phuthuoc).then(handleSuccess, handleError);
        }

        function GetInfoById(_id) {
            return $http.get('/api/sanphams/getById/' + _id).then(handleSuccess, handleError);
        }

        function GetByUsername(username) {
            return $http.get('/api/users/' + username).then(handleSuccess, handleError);
        }

        function CreateBasicInfo(cuahang) {
            return $http.post('/api/sanphams/createbasicinfo', cuahang).then(handleSuccess, handleError);
        }

        function UpdateBasicInfo(cuahang) {
            return $http.put('/api/sanphams/updatebasicinfo/' + cuahang._id, cuahang).then(handleSuccess, handleError);
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
