# ng-mosaic
Ng-mosaic, an angular plug-in that is used for making mosaic layouts

### Quick links
- [Getting Started](#getting-started)
- [Optional](#optional)
- [Demo](#demo)
- [Installation](#installation)
    - [NPM](#install-with-npm)
    - [Bower](#install-with-bower)
    
# Getting-Started

To get started, add `ng-mosaic.js` to your webpage:
```html
<script type="text/javascript" src="path/to/ng-mosaic.js"></script>
```

Import ng-mosaic and angular.
```
import angular from 'angular';
import ngMosaic from 'ng-mosaic';
```

Ensure that your application module specifies ngMosaic as a dependency:
```
const MODULE_NAME = 'myApplication';
angular.module(MODULE_NAME, [ngMosaic]);
export default MODULE_NAME;
```

Use the directive by specifying mosaic attribute on an element.
```
<div mosaic="$ctrl.myMosaicArray">
    <div ng-repeat="item in $ctrl.myMosaicArray">
        <div ng-style="{
         'width': item.width + 'px',
         'height': item.height + 'px'
        }">
        </div>
    </div>
</div>
```
# Optional

```
myMosaicArray: type: Array, 
      members: type: object
               attributes:
                   width: number,
                   height: number
              
example: [ ..., {width: 100, height: 100}, {width: 200, height: 200} ]
```
 
# Demo

 You can use 'mosaic' directive width 'infinite-scroll' directive(npm i infinite-scroll), like:
 
 ```
 <div infinite-scroll="$ctrl.infiniteFunction()" >
    <div mosaic="$ctrl.myMosaicArray" >
        <div ng-repeat="item in $ctrl.myMosaicArray">
            <!--infinite mosaic layout-->
            <div ng-style="{
             'width': item.width + 'px',
             'height': item.height + 'px'
            }">
            </div>
        </div>
    </div>
 </div>
 ```
 
# Installation
#### Install with NPM

```sh
$ npm install ng-mosaic
```

This will install AngularJS and ng-mosaic NPM packages.

#### Install with Bower
```sh
$ bower install ng-mosaic
```
