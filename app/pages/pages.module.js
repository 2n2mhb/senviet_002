/**
 * @author v.lugovsky
 * created on 16.12.2015
 */
(function () {
  'use strict';

  angular.module('BlurAdmin.pages', [
    'ui.router',

    'BlurAdmin.pages.dashboard',
    'BlurAdmin.pages.profile',
    'BlurAdmin.pages.cuahang',
    'BlurAdmin.pages.sanpham',
    'BlurAdmin.pages.kho',
    'BlurAdmin.pages.donhang',
	'BlurAdmin.pages.tables',
	'BlurAdmin.pages.form'
  ])
      .config(routeConfig);

  /** @ngInject */
  function routeConfig($urlRouterProvider, baSidebarServiceProvider) {
    $urlRouterProvider.otherwise('/dashboard');

    
  }

})();
