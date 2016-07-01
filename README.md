angular-transition-sugar
============================

Simple extensions to AngularJS to assist in the transition to Angular 2.

The goal of this project is to provide a [KISS](https://en.wikipedia.org/wiki/KISS_principle) and ready for production
alternative to ng-forward.

Given so, this project's principle could be summarized by the one under ng-forward : "start writing code using
Angular 2 conventions and styles that runs today on Angular" 1.5+.

In addition, we could add that this project is seen as a simple [syntax sugar](https://en.wikipedia.org/wiki/Syntactic_sugar)
to Angular 1.5+, in the way that it doesn't make radical transformations or additions, but provide only a "simpler way"
to write Angular 1.5+ projects with ES6 and SystemJS, with a closer style to Angular 2.

*As this project is at an early stage, we can't guaranty, as long as the 1.0.0 version hasn't been released, that it's
usage will stay as it is. For now, we doesn't recommand to use it in production, unless you are ready to follow the constant upgrades
and to contribute to the project. Please follow the issues to do so.*

install
---------

``jspm i ng-transition=github:noelmace/angular-transition-sugar``

### dependencies

This project require :
* babeljs (with polyfill and decorators support) or typescript
* SystemJS
* Angularjs 1.5+
* (for IE9+ compatibility) a function.name polyfill (babel-polyfill do the trick, thanks to core-js es6.function.name)

We recommend the use of jspm for dependencies management.

#### template handling

The best template solution with noelmace/angular-transition-sugar is the following :
use an angular template caching solution, like gulp-ng-html2js, which will transform each html template to a new angularjs module, whose name will be the template 'url'.

Here is a configuration example :

```javascript
gHtml2Js({
  template: "import angular from 'angular';\n" +
    "export default angular.module('<%= moduleName %>', []).run(['$templateCache', function($templateCache) {\n" +
    "   $templateCache.put('<%= template.url %>',\n    '<%= template.prettyEscapedContent %>');\n" +
    "}]);\n"
}
```

The module will be automatically added to you module dependencies (see ``@Module``).

**/!\** don't forget to import it in your component definition file, just like that :
```javascript
import template from 'app/app.component.tpl';

@Component({
    ...
    templateUrl: template.name
})
```

If you prefer to use another solution, set the ``templatesDependencies`` parameter to false for every module.

resources
----------

You can find usage examples in [sdn-angularjs-seed](https://github.com/Sedona-Solutions/sdn-angularjs-seed);

browser compatibility
-------------------------

A priori, the lib should be compatible with all modern browsers, including IE9+ (via polyfill). However, we haven't run full tests yet. We only can ensure you that it's compatible IE10+, Chrome 50+ and Firefox 45+. Please, open an issue if you find any bug on other browsers.

How to use it
--------------

### Core

The `ng-transition/core` module reflect the minimal amount of [@angular/core](https://github.com/angular/angular/tree/master/modules/%40angular/core)
elements to facilitate a basic use of AngularJS 1.5+.

#### @Component

Define an angularjs 1.5 component.

##### Parameters

- selector : the 'name' / selector of the component
- inputs : '<' bindings parameters, angular 2 style
    ``inputs: [ 'toto: tutu' ]`` will be translated to ``bindings: { toto: '<tutu' }``
- outputs : same as inputs, but with callbacks ('&')
- directives / providers : cf. Module

Then, all the other 'angularjs classic' component parameters (template, templateUrl, transclude, etc ...) will be merged with the generated configuration.

Of course, the decorated class is used as the component controller.

##### Example

```javascript
import { Component } from 'ng-transition/core';
import template from './my-component.component.tpl';

@Component({
    selector: 'my-component',
    inputs: [
        'input: myInput'
    ],
    outputs: [
        'output: myOutput'
    ],
    // and all angularjs 1.5 component object parameters
    bindings: {
        param: '@myParam'
    },
    templateUrl: template.name,
    ...
})
export class MyComponent {

    constructor() {

    }
}
```

#### @Directive

This decorator behave like ``@Component``, but for "attribute directives".

It simply put the provided configuration object in $directiveConfig, but also offer different default values than the default angularjs behaviour, following angular best practices for upgrade to Angular 2 :
- default ``restrict`` value is 'A'
- default ``controllerAs`` value is '$ctrl'

#### Injectable

Permit to define a service. The service id is the result of the conversion of the class UpperCamelCase name to lowerCamelCase.
This service need to be registered in a "Module Component" via the Component's providers array parameter, like with angular 2.
Then, all the injection process simply rely on angularjs. Use ``/* @ngInject */`` or the ``$inject`` class' property.

This decorator has no parameters.

### angular 1 specificities

This `ng-transition/ng1` module contains all the elements which haven't any Angular 2 equivalent, and are specific to this library.

#### @Module

Define an AngularJS module on a component.

Angular 2 does not have an "internal" module solution anymore. Instead, its rely on an es6 module approach.
We therefore choose to add a specific ``@Module``, which is the only of our decorators that haven't any equivalent in angular 2.

Use this decorator to "extend" the entry component for a module (ie. a folder, if you follow the angularjs guidelines).

It will automatically define a new angularjs module (named after the ``name`` parameter) with the defined ``dependencies``.

##### Basic parameters

* name (string): module's name / id
* dependencies (array of modules definition objets or string id - default []) : module's dependencies
* templatesDependencies (boolean - default true) : automatically add templates modules as module dependencies (cf. template handling)
* configs (array of functions - default []) : callback to call with module.config

##### Component decorator extended parameters

The module decorator define all the required components, directives and services thanks to the following ``@Component`` parameters :
* directives : array of required directives and components for this module
* providers : array of required services (cf. ``@Injectable``) for this module

**/!\** *The directives and providers Component parameters are not evaluated recursively. For now, using them in a ``@Component`` decorator without a direct ``@Module`` decorator will do nothing ! Due to Angular 2 guidelines, this feature isn't planned.*

##### Main module

Parameter : ``main`` (boolean - default false)

If set to true, this parameter define the module as the "main module", which result in some auto-configuration, and permit to use the following parameters :
    * html5mode (object) : html5mode configuration object
    * debug (boolean - default to false) : activate debug mode if true - **/!\** need to be set to false in production

##### Example

```javascript
import { Module } from 'ng-transition/ng1';
import { Component } from 'ng-transition/core';

@Module({
    name: 'sdnSeed',
    dependencies: [
        'ui.router',
        'oc.lazyLoad',
        'ct.ui.router.extras',
        DashboardComponent.$ngmodule.name
    ],
    main: true,
    html5mode: {
        enabled: true,
        requireBase: false
    },
    debug: true
})
@Component({
 ...
})
export class AppComponent {

    constructor(){}
}
```

### platform-browser-dynamic

Of course, AngularJS 1.5+ provide support for one platform only : browsers. You don't need to bother about others.
This module reflect the minimal amount of elements from `@angular/platform-browser-dynamic`, which will permit you to "boostrap" your AngularJS app.

#### bootstrap function

The AngularJS 1 and the Angular 2 bootstrap function as an important, basic, differences. When the first one take an
element as it first parameter, the second take a component.

Our boostrap function take a component as it first parameter, and translate it to the AngularJS syntax.

##### example

```javascript
import 'babel/polyfill';

import { AppComponent } from 'app/app.component';
import { bootstrap } from 'ng-transition/platform-browser-dynamic';

bootstrap(AppComponent);
```

### Router

For now, the `ng-transition/router` module is manimal, and doesn't reflect the last updates on the new angular 2 component router.
We will soon modify it to reflect as best as possible the `@angular/router` module.

For now, it only provide a unique decorator, @Routes, which had a "lazy loading" feature.

#### @Routes

Define component oriented, "``@angular/router`` style" routes via angular-ui-router + permit lazy loading.

##### Parameters

- name : state name (optionnal - the component name is used by default)
- component :
    - Component object, used to define the state template
    - or es6 import string reference to the component definition, for lazy loading
- lazy : boolean - force lazy loading if true (default to false). If true, require a string component parameter.
- useAsDefault : use this state as default - incompatible with lazy loading
- all other ui-router and ui-router-extras parameters (template, templateUrl, controller, parent ...) are available, and override the previous parameters

##### Example

```javascript
@Routes([
    {name: 'admin.builder', path: '/builder', component: BuilderComponent},
    {name: 'admin.users', path: '/users', component: UsersComponent}
])
```
