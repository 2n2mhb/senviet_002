/**
 * @author p.maslava
 * created on 28.11.2016
 */
(function () {
  'use strict';

  angular.module('BlurAdmin.pages.cuahang')
    .controller('CuahangtaomoiCtrl', SelectpickerPanelCtrl);

  /** @ngInject */
  function SelectpickerPanelCtrl($rootScope, $scope, $filter, $uibModal, editableOptions, 
    editableThemes, CuahangService, SanphamService, toastr) {

    //var vm = this;
    $scope.disabled = undefined;
    $scope.isTaomoi = false;
    $scope.submitted = false;
    // init page object
    $scope.thongtincuahang = {};
    $scope.thongtincuahang._id = null;
    $scope.thongtincuahang.diaphuong = null;
    $scope.thongtincuahang.tencuahang = null;
    $scope.thongtincuahang.chucuahang = null;
    $scope.thongtincuahang.sdt = null;
    $scope.thongtincuahang.diachi = null;
    $scope.thongtincuahang.trangthai = null;
    $scope.thongtincuahang.createdby = null;
    $scope.thongtincuahang.updatingby = null;
    $scope.thongtincuahang.updatedby = [];
    $scope.thongtincuahang.sanphams = [];
    
    $scope.tensanphams = [];

    initController();
    
    function initController() {
        //$rootScope.cuahang_id = "58a01507be87800320d966fa";
        // set current user
        if($rootScope.cuahang_id !== undefined && $rootScope.cuahang_id !== null && $rootScope.cuahang_id !== '') {
          CuahangService.GetInfoById($rootScope.cuahang_id).then(function (user) {
            $scope.thongtincuahang = user;
            $scope.thongtincuahang.updatedby = $rootScope.loggedinuser.username;
            //console.log('aaaaa');
          });
        } else {
          $scope.thongtincuahang.createdby = $rootScope.loggedinuser.username;
          $scope.thongtincuahang.phuthuoc = $rootScope.loggedinuser.phuthuoc;
        }

        // get all sanpham by _phuthuoc.
        SanphamService.GetAll($rootScope.loggedinuser.phuthuoc).then(function (user) {
          $scope.tensanphams = user;
          //console.log('aaaaa');
        });
    }
    
    
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
    
    //$scope.thongtincuahang.diaphuong = $scope.diaphuongs[1];
    //$scope.thongtincuahang.trangthai = $scope.trangthais[0];

    $scope.savecuahang = function(form) {
      // Trigger validation flag.
      $scope.submitted = true;

      // If form is invalid, return and let AngularJS show validation errors.
      if (form.$invalid) {
        return;
      }
      if($scope.thongtincuahang._id !== null ) {
        CuahangService.UpdateBasicInfo($scope.thongtincuahang)
          .then(function () {
              toastr.success('Đã chỉnh sửa thành công!');
          })
          .catch(function (error) {
              toastr.error("Your information hasn't been saved!", 'Error');
          });
      } else {
        CuahangService.CreateBasicInfo($scope.thongtincuahang)
          .then(function () {
              toastr.success('Your information has been saved successfully!');
              
          })
          .catch(function (error) {
              toastr.error("Your information hasn't been saved!", 'Error');
          });
      }
    }

    $scope.showTensanpham = function(sanpham) {
      var selected = [];
      if(sanpham._id) {
        selected = $filter('filter')($scope.tensanphams, {_id: sanpham._id});
      }
      return selected.length ? selected[0].tensanpham : 'Not set';
    };

    $scope.checkTensanpham = function(data, id) {
      if (id === 2 && data !== 'awesome') {
        return "Username 2 should be `awesome`";
      }
    };

    $scope.soluongs = [
      {value: 1, text: '10'},
      {value: 2, text: '50'},
      {value: 3, text: '200'},
    ];

    $scope.loadSoluong = function() {
      return $scope.soluong;
      
    };

    $scope.showSoluong = function(sanpham) {
      var selected = [];
      if(sanpham.soluong) {
        selected = $filter('filter')($scope.soluongs, {value: sanpham.soluong});
      }
      return selected.length ? selected[0].text : 'Not set';
    };
    
    $scope.donvis = [
      {value: 1, text: 'thùng'},
      {value: 2, text: 'hộp'}
    ];

    $scope.showDonvi = function(sanpham) {
      var selected = [];
      if(sanpham.donvi) {
        selected = $filter('filter')($scope.donvis, {value: sanpham.donvi});
      }
      return selected.length ? selected[0].text : 'Not set';
    };

    $scope.statuses = [
      {value: 1, text: 'Đang chạy'},
      {value: 2, text: 'Tạm dừng'},
      {value: 3, text: 'Hết hàng'},
    ];

    $scope.showStatus = function(sanpham) {
      var selected = [];
      if(sanpham.status) {
        selected = $filter('filter')($scope.statuses, {value: sanpham.status});
      }
      return selected.length ? selected[0].text : 'Not set';
    };

    $scope.saveSanpham = function() {
      
      if($scope.thongtincuahang._id !== null ) {
        CuahangService.UpdateSanphamInfo($scope.thongtincuahang)
          .then(function () {
              toastr.success('Đã chỉnh sửa thành công!');
          })
          .catch(function (error) {
              toastr.error("Your information hasn't been saved!", 'Error');
          });
      } else {
        $scope.openDialog('pages/ui/modals/modalTemplates/dangerModal.html')
      }
    };

    $scope.removeSanpham = function(index) {
      $scope.thongtincuahang.sanphams.splice(index, 1);
      
      $scope.saveSanpham();
      
    };

    $scope.addSanpham = function() {
      $scope.isTaomoi = true;
      $scope.inserted = {
        id: $scope.thongtincuahang.sanphams.length+1,
        _id:'',
        tensanpham: '',
        status: null,
        soluong: null,
        donvi: null,
        gia:''
      };
      $scope.thongtincuahang.sanphams.push($scope.inserted);
    };
    
    $scope.openDialog = function (page, size) {
      $uibModal.open({
        animation: true,
        templateUrl: page,
        size: size,
        resolve: {
          items: function () {
            return $scope.items;
          }
        }
      });
    };

    $scope.cancelAdvice = function(rowform, index){
      //console.log(rowform, index);
      if($scope.isTaomoi) {
        $scope.removeSanpham(index);  
      }
      rowform.$cancel();
    }
    
    $scope.activeAdvice = function(rowform, index){
      //console.log(rowform, index);
      $scope.isTaomoi = false;
      rowform.$show()
    }

    editableOptions.theme = 'bs3';
    editableThemes['bs3'].submitTpl = '<button type="submit" class="btn btn-primary btn-with-icon"><i class="ion-checkmark-round"></i></button>';
    editableThemes['bs3'].cancelTpl = '<button type="button" ng-click="$form.$cancel()" class="btn btn-default btn-with-icon"><i class="ion-close-round"></i></button>';

  }
})();


