/**
 * @author p.maslava
 * created on 28.11.2016
 */
(function () {
  'use strict';

  angular.module('BlurAdmin.pages.sanpham')
    .controller('SanphamtaomoiCtrl', SelectpickerPanelCtrl);

  /** @ngInject */
  function SelectpickerPanelCtrl($rootScope, $scope, SanphamService, toastr) {

    //var vm = this;
    $scope.disabled = undefined;
    $scope.isTaomoi = false;
    $scope.submitted = false;
    // init page object
    $scope.thongtinsanpham = {};
    $scope.thongtinsanpham._id = null;
    $scope.thongtinsanpham.tensanpham = null;
    $scope.thongtinsanpham.masanpham = null;
    $scope.thongtinsanpham.mota = null;
    $scope.thongtinsanpham.ghichu = null;
    $scope.thongtinsanpham.createdby = null;
    $scope.thongtinsanpham.updatingby = null;
    $scope.thongtinsanpham.updatedby = null;
    
    initController();
    
    function initController() {
        //$rootScope.cuahang_id = "58a01507be87800320d966fa";
        // set current user
        if($rootScope.sanpham_id !== undefined && $rootScope.sanpham_id !== null && $rootScope.sanpham_id !== '') {
          SanphamService.GetInfoById($rootScope.sanpham_id).then(function (user) {
            $scope.thongtinsanpham = user;
            $scope.thongtinsanpham.updatedby = $rootScope.loggedinuser.username;
            //console.log('aaaaa');
          });
        } else {
          $scope.thongtinsanpham.createdby = $rootScope.loggedinuser.username;
          $scope.thongtinsanpham.phuthuoc = $rootScope.loggedinuser.phuthuoc;
        }
        
    }

    $scope.savesanpham = function(form) {
      // Trigger validation flag.
      $scope.submitted = true;

      // If form is invalid, return and let AngularJS show validation errors.
      if (form.$invalid) {
        return;
      }

      if($scope.thongtinsanpham._id !== null ) {
        SanphamService.UpdateBasicInfo($scope.thongtinsanpham)
          .then(function () {
              toastr.success('Đã chỉnh sửa thành công!');
          })
          .catch(function (error) {
              toastr.error("Your information hasn't been saved!", 'Error');
          });
      } else {
        SanphamService.CreateBasicInfo($scope.thongtinsanpham)
          .then(function () {
              toastr.success('Your information has been saved successfully!');
              
          })
          .catch(function (error) {
              toastr.error("Your information hasn't been saved!", 'Error');
          });
      }
    }

  }
})();


