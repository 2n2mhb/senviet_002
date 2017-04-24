/**
 * @author p.maslava
 * created on 28.11.2016
 */
(function () {
  'use strict';

  angular.module('BlurAdmin.pages.cuahang')
    .controller('CuahangquanlyCtrl', SelectpickerPanelCtrl);

  /** @ngInject */
  function SelectpickerPanelCtrl($rootScope, $scope, $location, CuahangService, UserService, toastr) {

    //var vm = this;
    $scope.disabled = undefined;
    $scope.isTaomoi = false;
    $scope.submitted = false;
    // init page object
    $scope.danhsachcuahang = [];
    
    $scope.diaphuongs = [
      {label: 'Hồ Chí Minh', value: 1},
      {label: 'Bình Dương', value: 2},
      {label: 'Đồng Nai', value: 3},
      {label: 'Long An', value: 4},
      {label: 'Trà Vinh', value: 5},
      {label: 'Miền Tây', value: 6}
    ];

    $scope.trangthais = [
      {text: 'Đang hoạt động', value: 1},
      {text: 'Ngừng hoạt động', value: 2},
    ];

    initController();
    
    function initController() {
        $rootScope.cuahang_id = null;
        CuahangService.GetAll($rootScope.loggedinuser.phuthuoc).then(function (user) {
          $scope.danhsachcuahang = user;
          //console.log('aaaaa');
        });
        
        
    }
    
    $scope.themcuahang = function() {
      $rootScope.cuahang_id = null;
      $location.path("/cuahang/taomoi");
    }
    
    $scope.chitietSanpham = function(index) {
      //console.log(index);
      $rootScope.cuahang_id = index;
      $location.path("/cuahang/taomoi");

    }
    


  }
})();


