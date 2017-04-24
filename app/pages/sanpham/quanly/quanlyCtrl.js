/**
 * @author p.maslava
 * created on 28.11.2016
 */
(function () {
  'use strict';

  angular.module('BlurAdmin.pages.sanpham')
    .controller('SanphamquanlyCtrl', SelectpickerPanelCtrl);

  /** @ngInject */
  function SelectpickerPanelCtrl($rootScope, $scope, $location, SanphamService, toastr) {

    //var vm = this;
    $scope.disabled = undefined;
    $scope.isTaomoi = false;
    $scope.submitted = false;
    // init page object
    $scope.danhsachsanpham = [];
    
    initController();
    
    function initController() {
        $rootScope.sanpham_id = null;
        SanphamService.GetAll($rootScope.loggedinuser.phuthuoc).then(function (user) {
          $scope.danhsachsanpham = user;
          //console.log('aaaaa');
        });
        
        
    }
    
    $scope.themsanpham = function() {
      $rootScope.sanpham_id = null;
      $location.path("/sanpham/taomoi");
    }
    
    $scope.chitietSanpham = function(index) {
      //console.log(index);
      $rootScope.sanpham_id = index;
      $location.path("/sanpham/taomoi");

    }
    


  }
})();