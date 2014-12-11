'use strict';

angular.module('emuwebApp')
  .directive('modal', function ($animate, modalService) {
    return {
      restrict: 'E',
      templateUrl: 'views/modal.html',
      replace: true,
      scope: { 
      },
      link: function (scope, element, attr) {
        scope.templateUrl = '';
        scope.modal = modalService;
        scope.isOpen = false;
        scope.controller = 'ModalCtrl';
		scope.$watch('modal.isOpen', function(newValue, oldValue) {
			if(newValue!==undefined) {
			    scope.templateUrl = modalService.getTemplateUrl();
				if(newValue) {
				    element[0].classList.add('emuwebapp-modalDialog-isOpen');
				}
				else {
				    element[0].classList.remove('emuwebapp-modalDialog-isOpen');
				}
			}
		});
		scope.closeModal = function() {
		    modalService.close();
		};
		
		scope.getController = function() {
		    return modalService.getController();
		};
      }
    };
  });