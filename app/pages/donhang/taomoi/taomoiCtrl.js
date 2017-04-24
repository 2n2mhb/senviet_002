/**
 * @author p.maslava
 * created on 28.11.2016
 */
(function () {
	'use strict';

	angular.module('BlurAdmin.pages.donhang')
	.controller('DonhangtaomoiCtrl', SelectpickerPanelCtrl);

	/** @ngInject */
	function SelectpickerPanelCtrl($rootScope, $scope, $filter, $uibModal, editableOptions, 
	editableThemes, CuahangService, SanphamService, DonhangService, toastr) {

	//var vm = this;
	$scope.screenTitle = "Chỉnh sửa đơn hàng";
	$scope.disabled = undefined;
	$scope.isTaomoi = false;
	$scope.submitted = false;
	// init page object
	$scope.donhang = {
		_id: null,
		madonhang : null,
		ngaydathang : null,
		trangthai:null,
		createdby:null,
		phuthuoc:null,
		updatingby:null,
		updatedby:[]
	};
	
	$scope.donhang.common = {};
	$scope.donhang.common.cuahanggiao_id = null;
	$scope.donhang.common.cuahanggiao = null;
	$scope.donhang.common.cuahangnhan_id = null;
	$scope.donhang.common.cuahangnhan = null;
	$scope.donhang.common.nguoinhan = null;
	$scope.donhang.common.sdt = null;
	$scope.donhang.common.diachinhan = null;
	$scope.donhang.common.ngaygiao = null;
	$scope.donhang.common.ghichu = null;
	
	$scope.donhang.sanphams = [];
	
	$scope.donhang.thanhtoan = {
		hinhthuc : null,
		nganhang : null,
		stk : null,
		chutaikhoan : null
	};
	
	
	$scope.cuahanggiaos = [];
	$scope.cuahangnhans = [];
	$scope.tensanphams = [];
	$scope.cuahangsanphams = [];

	initController();
	
	function initController() {
		$scope.donhang.createdby = $rootScope.loggedinuser.firstName + " " + $rootScope.loggedinuser.lastName;
		$scope.donhang.phuthuoc = $rootScope.loggedinuser.phuthuoc;
		$scope.donhang.trangthai = 0;
		$scope.isSanphamAdded = false;
		// get all sanpham by _phuthuoc.
		CuahangService.GetInfoById($rootScope.loggedinuser.phuthuoc).then(function (user) {
		$scope.cuahanggiaos = $scope.cuahanggiaos.concat(user);
		//console.log('aaaaa');
		if(user.phuthuoc !== undefined && user.phuthuoc !== '') {
			CuahangService.GetInfoById(user.phuthuoc).then(function (user) {
			user.isCuahangcha = true;
			$scope.cuahanggiaos = $scope.cuahanggiaos.concat(user);
			//console.log('aaaaa');
		});	
		}
		
		});
		$scope.donhang.common.ngaydathang = (new Date()).toISOString().slice(0,10).replace(/-/g,"/");
		// get all sanpham by _phuthuoc.
		SanphamService.GetAll($rootScope.loggedinuser.phuthuoc).then(function (user) {
		$scope.tensanphams = user;
		//console.log('aaaaa');
		});
	}
	
	$scope.datepicker = {
		opened1:false
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
	
	$scope.savedonhang = function(form) {
		// Trigger validation flag.
		$scope.submitted = true;

		// If form is invalid, return and let AngularJS show validation errors.
		if($scope.donhang.cuahanggiao_id === null && $scope.isSanphamAdded === null) {
		return;
		}

		if($scope.donhang._id !== null ) {
		DonhangService.UpdateBasicInfo($scope.donhang)
			.then(function () {
				toastr.success('Đã chỉnh sửa thành công!');
			})
			.catch(function (error) {
				toastr.error("Your information hasn't been saved!", 'Error');
			});
		} else {
		DonhangService.CreateDonhang($scope.donhang)
			.then(function () {
				$scope.donhang = {};
				toastr.success('Đã đặt hàng thành công.');
			})
			.catch(function (error) {
				toastr.error("Your information hasn't been saved!", 'Error');
			});
		}
	}

	$scope.showTensanpham = function(sanpham) {
		var selected = [];
		if(sanpham.tensanpham) {
		selected = $filter('filter')($scope.tensanphams, {_id: sanpham.tensanpham});
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

	$scope.removeSanpham = function(index) {
		$scope.donhang.sanphams.splice(index, 1);
		if($scope.donhang.sanphams.length == 0) {
		$scope.isSanphamAdded = false;
		}
	};

	$scope.addSanpham = function() {
		$scope.isTaomoi = true;
		$scope.inserted = {
		id: $scope.donhang.sanphams.length+1,
		tensanpham: '',
		soluong: null,
		donvi: null,
		thanhtien:''
		};
		$scope.donhang.sanphams.push($scope.inserted);
	};

	$scope.onCuahanggiaoSelected = function(item) {
		if(item.isCuahangcha !== undefined && item.isCuahangcha) {
		$scope.donhang_layhang = true;
		$scope.donhang.cuahangnhan = null;
		$scope.donhang.cuahanggiao_id = item._id;
		$scope.cuahangnhans = [];
		$scope.cuahangnhans = $scope.cuahangnhans.concat($scope.cuahanggiaos[0]);
		// get cuahangnhans
		CuahangService.GetAll($scope.cuahanggiaos[0]._id).then(function (user) {
			$scope.cuahangnhans = $scope.cuahangnhans.concat(user);
		});	
		} else {
		$scope.donhang_layhang = false;
		$scope.donhang.cuahangnhan = null;
		$scope.donhang.cuahanggiao_id = item._id;
		$scope.cuahangnhans = [];
		// get cuahangnhans
		CuahangService.GetAll(item._id).then(function (user) {
			$scope.cuahangnhans = $scope.cuahangnhans.concat(user);
		});	
		}
		
	}
	
	
	$scope.onCuahangnhanSelected = function(item) {

		$scope.donhang.cuahangnhan_id = item._id;
		// get thongtincuahang
		CuahangService.GetInfoById(item._id).then(function (user) {
		$scope.donhang.common.nguoinhan = user.chucuahang;
		$scope.donhang.common.diachinhan = user.diachi;
		$scope.donhang.common.sdt = user.diachi;
		// Lấy gói sản phẩm đã set, bổ sung thông tin.
		$scope.cuahangsanphams = user.sanphams;
		// bổ sung thông tin.
		angular.forEach($scope.cuahangsanphams, function(value, key) {
			var selected = [];
			if(value._id) {
			selected = $filter('filter')($scope.tensanphams, {_id: value._id});
			}
			
			if(selected.length) {
			value.tensanpham = selected[0].tensanpham + ' ' ; 
			} else {
			value.tensanpham = 'Error.'
			}

			selected = [];
			if(value.soluong) {
			selected = $filter('filter')($scope.soluongs, {value: value.soluong});
			}
			//return selected.length ? selected[0].text : 'Not set';

			if(selected.length) {
			value.tensanpham = value.tensanpham + selected[0].text + ' '; 
			value.decodeSoluong = selected[0].text;
			} else {
			value.tensanpham = 'Error.'
			}

			selected = [];
			if(value.donvi) {
			selected = $filter('filter')($scope.donvis, {value: value.donvi});
			}
			//return selected.length ? selected[0].text : 'Not set';

			if(selected.length) {
			value.tensanpham = value.tensanpham + selected[0].text ; 
			} else {
			value.tensanpham = 'Error.'
			}
		});
		});
		var strDate = (new Date()).toISOString().replace(/[^0-9]/g, "");
		$scope.donhang.madonhang = strDate;

	}

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
	
	$scope.checkEmpty = function (data) {
		if (!data) {
		return "Cần nhập";
		}

	};

	$scope.selectSanpham = function (rowform) {
		//console.log(data);
		rowform.$editables[1].scope.$data = null;
		rowform.$editables[2].scope.$data = null;
	}

	$scope.beforesaveSanpham = function(rowform, data) {
		if(data.soluong < data.tensanpham.decodeSoluong) {
		$scope.isSanphamAdded = false;
		rowform.$setError("soluong","Nhập từ giá trị tối thiểu trở lên."); 
		return "error.";
		} else {
		$scope.isSanphamAdded = true;
		}
		//return "error."
	};

	$scope.saveSanpham = function(rowform, data) {
		if($scope.donhang.cuahanggiao_id !== null && $scope.isSanphamAdded !== null ) {
		DonhangService.CreateDonhang($scope.donhang)
			.then(function () {
				toastr.success('Đã tạo đơn hàng thành công.');
			})
			.catch(function (error) {
				toastr.error("Không tạo được đơn hàng.", 'Error');
			});
		} else {
		$scope.openDialog('pages/ui/modals/modalTemplates/dangerModal.html')
		}
		//return "error."
	};


	$scope.tinhThanhtien = function(rowform, data) {
		rowform.$data.thanhtien = data * rowform.$data.tensanpham.gia;
		rowform.$editables[2].scope.$data = rowform.$data.thanhtien;
		console.log(rowform.$data.thanhtien);
	};
	

	$scope.cancelAdvice = function(rowform, index){
		//console.log(rowform, index);
		if($scope.isTaomoi) {
		$scope.removeSanpham(index);	
		}
		rowform.$cancel();
	}
	
	$scope.printDiv = function(divName) {
		var printdiv1 = document.getElementById("printdiv1").innerHTML;
		var printdiv2 = document.getElementById("printdiv2").innerHTML;
		var printdiv3 = document.getElementById("printdiv3").innerHTML;
		var popupWin = window.open('', '_blank', 'width=800,height=600');
		popupWin.document.open();
		popupWin.document.write('<html><head><link rel="stylesheet" href="app-content/js/Ionicons/css/ionicons.css" /><link rel="stylesheet" href="app-content/js/angular-toastr/dist/angular-toastr.css" /><link rel="stylesheet" href="app-content/js/animate.css/animate.css" /><link rel="stylesheet" href="app-content/js/bootstrap/dist/css/bootstrap.css" /><link rel="stylesheet" href="app-content/js/bootstrap-select/dist/css/bootstrap-select.css" /><link rel="stylesheet" href="app-content/js/bootstrap-switch/dist/css/bootstrap3/bootstrap-switch.css" /><link rel="stylesheet" href="app-content/js/bootstrap-tagsinput/dist/bootstrap-tagsinput.css" /><link rel="stylesheet" href="app-content/js/font-awesome/css/font-awesome.css" /><link rel="stylesheet" href="app-content/js/fullcalendar/dist/fullcalendar.css" /><link rel="stylesheet" href="app-content/js/leaflet/dist/leaflet.css" /><link rel="stylesheet" href="app-content/js/angular-progress-button-styles/dist/angular-progress-button-styles.min.css" /><link rel="stylesheet" href="app-content/js/chartist/dist/chartist.min.css" /><link rel="stylesheet" href="app-content/js/morris.js/morris.css" /><link rel="stylesheet" href="app-content/js/ionrangeslider/css/ion.rangeSlider.css" /><link rel="stylesheet" href="app-content/js/ionrangeslider/css/ion.rangeSlider.skinFlat.css" /><link rel="stylesheet" href="app-content/js/textAngular/dist/textAngular.css" /><link rel="stylesheet" href="app-content/js/angular-xeditable/dist/css/xeditable.css" /><link rel="stylesheet" href="app-content/js/jstree/dist/themes/default/style.css" /><link rel="stylesheet" href="app-content/js/angular-ui-select/dist/select.css" /></head><body onload="window.print()">' + printdiv1 + printdiv2 + printdiv3 + '</body></html>');
		popupWin.document.close();
	} 

	editableOptions.theme = 'bs3';
	editableThemes['bs3'].submitTpl = '<button type="submit" class="btn btn-primary btn-with-icon"><i class="ion-checkmark-round"></i></button>';
	editableThemes['bs3'].cancelTpl = '<button type="button" ng-click="$form.$cancel()" class="btn btn-default btn-with-icon"><i class="ion-close-round"></i></button>';

	}
})();


