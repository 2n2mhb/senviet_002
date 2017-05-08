/**
 * @author v.lugovsky
 * created on 16.12.2015
 */
(function () {
  'use strict';

  angular.module('BlurAdmin.pages.cuahang', [])
      .config(routeConfig);

  /** @ngInject */
  function routeConfig($stateProvider) {
    $stateProvider
        .state('cuahang', {
          url: '/cuahang',
          template : '<ui-view autoscroll="true" autoscroll-body-top></ui-view>',
          abstract: true,
          title: 'Cửa hàng',
          sidebarMeta: {
            icon: 'ion-ios-people-outline',
            order: 10,
          },
        })
        .state('cuahang.quanly', {
          url: '/quanly',
          templateUrl: 'pages/cuahang/quanly/quanly.html',
          controller: 'CuahangquanlyCtrl',
          title: 'Danh sách cửa hàng',
          sidebarMeta: {
            order: 0,
          },
        })
        .state('cuahang.taomoi', {
          url: '/taomoi',
          templateUrl: 'pages/cuahang/taomoi/taomoi.html',
          controller: 'CuahangtaomoiCtrl',
          title: 'Tạo cửa hàng',
          sidebarMeta: {
            order: 100,
          },
        });
  }
})();
