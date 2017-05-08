/**
 * @author v.lugovsky
 * created on 16.12.2015
 */
(function () {
	'use strict';

	angular.module('BlurAdmin.pages.donhang', ['ui.select', 'ngSanitize'])
		.config(routeConfig);

	/** @ngInject */
	function routeConfig($stateProvider) {
	$stateProvider
		.state('donhang', {
			url: '/donhang',
			template : '<ui-view autoscroll="true" autoscroll-body-top></ui-view>',
			abstract: true,
			title: 'Đơn hàng',
			sidebarMeta: {
			icon: 'ion-ios-pricetags-outline',
			order: 40,
			},
		})
		.state('donhang.taodon', {
			url: '/taodon',
			templateUrl: 'pages/donhang/taomoi/taomoi.html',
			controller: 'DonhangtaomoiCtrl',
			controllerAs: 'vm',
			title: 'Tạo đơn hàng',
			sidebarMeta: {
			order: 100,
			},
		})
		.state('donhang.xulydon', {
			url: '/xulydon',
			templateUrl: 'pages/donhang/xuly/xuly.html',
			controller: 'DonhangxulyCtrl',
			title: 'Danh sách đơn hàng',
			sidebarMeta: {
			order: 0,
			},
		});
	}
})();
