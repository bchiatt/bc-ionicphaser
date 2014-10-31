angular.module('bc-ionicphaser', ['ionic'])

.run(function($ionicPlatform){
  'use strict';

  $ionicPlatform.ready(function(){
    if(window.cordova && window.cordova.plugins.Keyboard){
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
    if(window.StatusBar){
      StatusBar.styleDefault();
    }
  });
});
