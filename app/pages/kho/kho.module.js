/**
 * @author v.lugovsky
 * created on 16.12.2015
 */
(function () {
  'use strict';

  angular.module('BlurAdmin.pages.kho', ['ui.select', 'ngSanitize'])
      .config(routeConfig);

  /** @ngInject */
  function routeConfig($stateProvider) {
    $stateProvider
        .state('kho', {
          url: '/kho',
          template : '<ui-view autoscroll="true" autoscroll-body-top></ui-view>',
          abstract: true,
          title: 'Kho vận',
          sidebarMeta: {
            icon: 'ion-compose',
            order: 30,
          },
        })
        .state('kho.tongquat', {
          url: '/tongquat',
          templateUrl: 'pages/form/inputs/inputs.html',
          title: 'Xem tổng quát',
          sidebarMeta: {
            order: 0,
          },
        })
        .state('kho.themkho', {
          url: '/themkho',
          templateUrl: 'pages/form/layouts/layouts.html',
          title: 'Thêm kho',
          sidebarMeta: {
            order: 100,
          },
        })
        .state('kho.nhapkho', {
          url: '/nhapkho',
          templateUrl: 'pages/form/layouts/layouts.html',
          title: 'Nhập kho',
          sidebarMeta: {
            order: 200,
          },
        });
  }
})();
