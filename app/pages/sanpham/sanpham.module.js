/**
 * @author v.lugovsky
 * created on 16.12.2015
 */
(function () {
  'use strict';

  angular.module('BlurAdmin.pages.sanpham', ['ui.select', 'ngSanitize'])
      .config(routeConfig);

  /** @ngInject */
  function routeConfig($stateProvider) {
    $stateProvider
        .state('sanpham', {
          url: '/sanpham',
          template : '<ui-view autoscroll="true" autoscroll-body-top></ui-view>',
          abstract: true,
          title: 'Sản phẩm',
          sidebarMeta: {
            icon: 'ion-compose',
            order: 20,
          },
        })
        .state('sanpham.quanly', {
          url: '/quanly',
          templateUrl: 'pages/sanpham/quanly/quanly.html',
          controller: 'SanphamquanlyCtrl',
          title: 'Quản lý sản phẩm',
          sidebarMeta: {
            order: 0,
          },
        })
        .state('sanpham.taomoi', {
          url: '/taomoi',
          templateUrl: 'pages/sanpham/taomoi/taomoi.html',
          controller: 'SanphamtaomoiCtrl',
          title: 'Chỉnh sửa sản phẩm',
          sidebarMeta: {
            order: 100,
          },
        });
  }
})();
