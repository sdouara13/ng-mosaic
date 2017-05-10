(function (root, factory) {
    'use strict';
    if (typeof define === 'function' && define.amd) {
        define(['angular'], factory);
    } else if (root.hasOwnProperty('angular')) {
        factory(root.angular);
    } else if (typeof exports === 'object') {
        module.exports = factory(require('angular'));
    }
}(this , function (angular) {
    'use strict';
    angular = (angular && angular.module ) ? angular : window.angular;

    return angular.module('ngMosaic', [])
    /**
     * @ngdoc object
     * @name ngMosaic.mosaic
     * @requires $document
     */
        .directive('mosaic', ['$compile', '$timeout', '$document', '$templateCache', '$http', '$sce', '$log', function($compile, $timeout, $document, $templateCache, $http, $sce, $log) {
	        var template = '<div class="mosaic-template"></div>';
            var mosaicLinkedScope;
            return {
                restrict: 'AC',
                scope: {
                    mosaic: '=',
                },
                compile: function (element, attrs) {
                    var mosaicLinker;
                    var mosaicEle;
	                var appendToBody = false;
	                var i;
	                var $ele = $(element);
                    var widthLimit = $ele.width() || $document.width();
                    var minHeight = 300;
	                var height;
	                var lineNumber = 0;
	                var lastIndex = 0;
	                var nextIndex = 0;
	                var scale;
	                var scopeWatcher;
	                mosaicLinker = $compile(template);
                    return function link(scope, element, attrs) {
                        var newLine = true;
                        var widthSum;
                        var timer;
                        var mosaicScope = scope.$new(true);
                        scopeWatcher = scope.$watch(
                            function () {
                                return scope.mosaic;
                            },
                            function (n, o) {
                                if(n.length === o.length) {
                                    return;
                                }
                                if(timer) {
                                    $timeout.cancel(timer);
                                }
                                timer = $timeout(function () {
                                    startMosaic(n, 'compare');
                                }, 0);
                            },
                            true
                        );

	                    createMosaic();

                        function createMosaic() {
                            var watcher;
                            var oldResize;
                            if (mosaicEle) {
                                removeMosaic();
                            }
                            mosaicLinkedScope = mosaicScope.$new();
                            mosaicLinkedScope.mosaic = scope.mosaic;

                            mosaicEle = mosaicLinker(mosaicLinkedScope, function (mosaic) {
                                widthLimit =  $(mosaic).width() || widthLimit;
                                if(timer) {
                                    $timeout.cancel(timer);
                                }
                                timer = $timeout(function () {

                                    startMosaic(mosaicLinkedScope.mosaic, 'link');
                                }, 0);
                                if (appendToBody) {
                                    $document.find('body').append(mosaic);
                                } else {
                                    element.after(mosaic);
                                }
                            });
                        }

	                    function removeMosaic() {
		                    if (mosaicEle) {
			                    mosaicEle.remove();
			                    mosaicEle = null;
		                    }
		                    if (mosaicLinkedScope) {
			                    mosaicLinkedScope.$destroy();
			                    mosaicLinkedScope = null;
		                    }
		                    if(timer) {
			                    $timeout.cancel(timer);
		                    }
		                    if(scopeWatcher) {
                                scopeWatcher();
                            }
	                    }

	                    function startMosaic(mosaicImageSize, type) {
                            var item;
                            widthSum = 0;
                            newLine = true;
		                    if(!angular.isArray(mosaicImageSize)) {
		                        $log.debug('mosaic data is not an array');
			                    return;
		                    }
                            lastIndex = nextIndex;

		                    for(i = nextIndex ; i < mosaicImageSize.length; i ++) {
			                    item = mosaicImageSize[i];
                                if(!item.width) {
			                    	break;
			                    }
                                if(newLine) {
				                    height = item.height < minHeight ? minHeight : item.height;
				                    scale = height / item.height;
				                    widthSum = item.width * scale;
				                    item.height = height;
				                    item.width = widthSum;
				                    newLine = false;
				                    judgeLine(i, mosaicImageSize);
				                    continue;
			                    }

			                    widthSum += item.width * height / item.height;
			                    scale = height / item.height;
			                    item.height = height;
			                    item.width *= scale;
			                    judgeLine(i, mosaicImageSize);
		                    }

	                    }

                        function judgeLine(index, mosaicImageSize) {
                            var i;
                            var item;
                            var scale;
                            var sum = 0;
                            if(widthSum >= widthLimit) {
                                newLine = true;
                                scale = widthLimit / widthSum;
                                for(i = nextIndex; i <= index; i ++) {
                                    item = mosaicImageSize[i];
                                    item._lineNumber = lineNumber;
                                    item.width *= scale;
                                    item.height *= scale;
                                    sum += item.width;
                                    item._cal = true;
                                }
                                lineNumber ++;
                                if(index === mosaicImageSize.length - 1) {
                                    lineNumber -= 1;
                                }
                                else {
                                    nextIndex = index + 1;
                                }
                            }
                        }
                    }
                }

            };
        }]);


}));