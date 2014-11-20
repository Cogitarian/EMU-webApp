'use strict';


angular.module('emuwebApp')
.directive('myDropZone', function ($animate, $compile, DragnDropDataService, browserDetector, appStateService, dialogService) {
	return {
		templateUrl: 'views/myDropZone.html',
		restrict: 'E',
		scope: {
		},
		link: function postLink(scope, element, attr) {
			scope.dropTextDefault = 'Drop your files here or click here to open a file';
			scope.dropTextErrorFileType = 'Error: Could not parse file. The following file types are supported: .WAV .TEXTGRID';
			scope.dropTextErrorAPI = 'Sorry ! The File APIs are not fully supported in your browser.';
			scope.dropAllowed = 'Drop file(s) to start loading !';
			scope.dropParsingStarted = 'Parsing started';
			scope.dropParsingWaiting = '.TextGrid loaded! Please load .WAV file in order to start!';
			scope.dropHintDefault = 'Load .TextGrid first or .TextGrid and .WAV at once!';

			scope.dropText = scope.dropTextDefault;
			scope.dropHint = scope.dropHintDefault;

			scope.dropClass = '';
			scope.count = 0;
			scope.handles = [];


		    scope.updateQueueLength = function (quantity) {
				scope.count += quantity;
			}
 
			scope.enqueueFileAddition = function (file) {
                var extension = file.name.substr(file.name.lastIndexOf('.') + 1).toUpperCase();
				if(extension === 'WAV' || extension === 'TEXTGRID' ) {
    			    scope.handles.push(file); 
			    }
			    else {
		            scope.dropClass = 'error';
				    scope.dropText = scope.dropTextErrorFileType;
					scope.handles = [];
					scope.count = 0;
					scope.$digest();
    			}
				
				// If all the files we expect have shown up, then flush the queue.
				if (scope.count === scope.handles.length) {
					DragnDropDataService.setData(scope.handles);
					scope.handles = [];
					scope.count = 0;
				}
			}        
		  
			scope.loadFiles = function (files) {
				scope.updateQueueLength(files.length);
				for (var i = 0; i < files.length; i++) {
				    var file = files[i];
				    if(file.name==='.DS_Store') {
				        scope.updateQueueLength(-1);
				    }
				    else {
						var entry, reader;
		 
						if (file.isFile || file.isDirectory) {
							entry = file;
						}
						else if (file.getAsEntry) {
							entry = file.getAsEntry();
						}
						else if (file.webkitGetAsEntry) {
							entry = file.webkitGetAsEntry();
						}
						else if (typeof file.getAsFile === 'function') {
							scope.enqueueFileAddition(file.getAsFile());
							continue;
						}
						else if (File && file instanceof File) {
							scope.enqueueFileAddition(file);
							continue;
						}
						else {
							scope.updateQueueLength(-1);
							continue;
						}
		 
						if (!entry) {
							updateQueueLength(-1);
						}
						else if (entry.isFile) {
							entry.file(function(file) {
								scope.enqueueFileAddition(file);
							}, function(err) {
								console.warn(err);
							});
						}
						else if (entry.isDirectory) {
							reader = entry.createReader();
							reader.readEntries(function(entries) {
								scope.loadFiles(entries);
								scope.updateQueueLength(-1);
							}, function(err) {
								console.warn(err);
							});
						}
					}
				}
			}    

		  scope.dragEnterLeave = function(evt) {
		    evt.preventDefault();
		    scope.$apply(function () {
		      scope.dropText = scope.dropTextDefault;
		      scope.dropClass = '';
		    });
		  }
		  
		  scope.handleDragOver = function(evt) {
		    evt.preventDefault();
		    scope.$apply(function () {
		      scope.dropText = scope.dropAllowed;
		      scope.dropClass = 'over';
		    });
		  }	
		  
		  scope.dropFiles = function(evt) {
		    evt.stopPropagation();
		    evt.preventDefault();
		    scope.$apply(function () {
              if (window.File && window.FileReader && window.FileList && window.Blob) {
		        if(evt.originalEvent !== undefined) {          
                  if(browserDetector.isBrowser.Firefox()) {
                    var items = evt.originalEvent.dataTransfer.files;
                  }
                  else {        
                    var items = evt.originalEvent.dataTransfer.items;
                  }
                  scope.loadFiles(items);
                }
                else {
    		      scope.dropText = scope.dropTextErrorFileType;
	    	      scope.dropClass = 'error';  
                  dialogService.open('views/error.html', 'ModalCtrl', 'Error: Unknown File Type for File ' + scope.$parent.other.name).then(function (res) {
                    scope.dropText = scope.dropTextDefault;
                    scope.dropClass = '';
                    appStateService.resetToInitState();
                  });              
                }
              }
              else {
                dialogService.open('views/error.html', 'ModalCtrl', scope.dropTextErrorAPI);
                scope.dropText = scope.dropTextDefault;
                scope.dropClass = '';
              }
            });
		  }		  

          element.bind('drop', function (event) {
            scope.dropFiles(event);
          });	  

          element.bind('dragover', function (event) {
            scope.handleDragOver(event);
          });
              		
          element.bind('dragenter', function (event) {
            scope.dragEnterLeave(event);
          });	
    		
          element.bind('dragleave', function (event) {
            scope.dragEnterLeave(event);
          });		
    		
          element.bind('click', function (event) {
            element.context.children[0].children[1].click();
          });	
          
          
      	
		
		}
	};
});
