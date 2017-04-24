/**
 * @author p.maslava
 * created on 28.11.2016
 */
(function () {
  'use strict';

  angular.module('BlurAdmin.pages.donhang')
    .controller('DonhangxulyCtrl', SelectpickerPanelCtrl);

  /** @ngInject */
  function SelectpickerPanelCtrl($rootScope, $scope, $filter, $uibModal, editableOptions, 
    editableThemes, CuahangService, SanphamService, DonhangService, toastr) {

    //var vm = this;
    $scope.disabled = undefined;
    $scope.isTaomoi = false;
    $scope.submitted = false;
    // init page object
    $scope.moitao = {
      search: {
        fromDate: null,
        toDate: null,
        fromCus: null
      },
      resultLst:[]
    };
    
    
    $scope.dsKhachHang = [];
    $scope.cuahangnhans = [];
    $scope.tensanphams = [];
    $scope.cuahangsanphams = [];

    initController();
    
    function initController() {
      CuahangService.GetAll($rootScope.loggedinuser.phuthuoc).then(function (user) {
          $scope.dsKhachHang = user;
          //console.log('aaaaa');
        });
    }
	
	$scope.smartTablePageSize = 15;

    $scope.recordList = [];
	
	$scope.datepicker = {
		opened1:false,
		opened2:false
	};
	
	$scope.formats = ['dd-MM-yyyy', 'yyyy/MM/dd', 'dd.MM.yyyy', 'shortDate'];
	$scope.format = $scope.formats[1];
	$scope.options = {
		showWeeks: false
	};
	
	$scope.open = function($event,opened) {
		$event.preventDefault();
		$event.stopPropagation();
		$scope.datepicker[opened] = true;
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

    $scope.onMoiTaoSts_searchRecords = function() {
      DonhangService.GetAll($rootScope.loggedinuser.phuthuoc)
        .then(function (donhangs) {
          $scope.recordList = donhangs;
          //toastr.success('Đã đặt hàng thành công.');
        })
        .catch(function (error) {
          toastr.error("Your information hasn't been saved!", 'Error');
        });
    }
    
    $scope.onMoiTaoSts_SearchKhachHang = function(item) {
      alert(item);
    }

    editableOptions.theme = 'bs3';
    editableThemes['bs3'].submitTpl = '<button type="submit" class="btn btn-primary btn-with-icon"><i class="ion-checkmark-round"></i></button>';
    editableThemes['bs3'].cancelTpl = '<button type="button" ng-click="$form.$cancel()" class="btn btn-default btn-with-icon"><i class="ion-close-round"></i></button>';

  }
})();


