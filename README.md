angular-transition-sugar
============================

Simple AngularJS extensions to facilitate transition to Angular.

The goal of this project is to provide a [KISS](https://en.wikipedia.org/wiki/KISS_principle) and ready for production
alternative to [ng-forward](https://github.com/ngUpgraders/ng-forward/).

Given so, this project's principle could be summarized by the one under ng-forward : "start writing code using
Angular 2 conventions and styles that runs today on Angular" 1.5+, but with a KISS approch. 

KISS mean for us that this project is seen as a simple [syntax sugar](https://en.wikipedia.org/wiki/Syntactic_sugar)
to Angular 1.5+, in the way that it doesn't make radical transformations or additions, and doesn't hidde the angularjs 1 behind a big overlay like ng-metadata does, but provide only a "simpler way" to write Angular 1.5+ projects with ES6 and SystemJS, with a closer style to Angular 2.

**if you need a complete Angular 2 decorators solution for your Angular 1 apps, consider using [ng-metadata](https://github.com/ngParty/ng-metadata).**

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

We recommand the following template handling solution with angular-transition-sugar :
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

The module will be automatically added to you module dependencies (see [@Module](#module)).

> :warning: **WARNING**
>
> don't forget to import it in your component definition file, just like that :
>
> ```javascript
> import template from 'app/app.component.tpl';
> 
> @Component({
>     ...
>     templateUrl: template.name
> })
> ```

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

| key            | type        | default value              | description                              | example                     |
| -------------- | ----------- | -------------------------- | ---------------------------------------- | --------------------------- |
| selector       | string      |                            | the 'name' / selector of the component   |
| inputs         | string[]      |                            | '<' bindings parameters, angular 2 style | ``inputs: [ 'toto: tutu' ]`` will be translated to ``bindings: { toto: '<tutu' }`` |
| outputs        | string[]    |                            | same as inputs, but with callbacks ('&') |                          |
| directives / providers | class[] |                          | cf. [@Module](#module)                   |

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

This decorator behave like [@Component](#component), but for "attribute directives".

It simply put the provided configuration object in $directiveConfig, but also offer different default values than the default angularjs behaviour, following angular best practices for upgrade to Angular 2 :
- default ``restrict`` value is 'A'
- default ``controllerAs`` value is '$ctrl'

#### Injectable

Permit to define a service. The service id is either the id parameter, or, if this one is falsy, the result of the conversion of the class UpperCamelCase name to lowerCamelCase.


> :warning: **WARNING**
> 
> If you intend to shorten the classes names during minification, you need to use the id parameter on *every* injectable.

This service need to be registered in a "Module Component" via the Component's providers array parameter, like with angular 2.
Then, all the injection process simply rely on angularjs. Use ``/* @ngInject */`` or the ``$inject`` class' property.

##### Parameters

| key            | type        | default value              | description                              | example                     |
| -------------- | ----------- | -------------------------- | ---------------------------------------- | --------------------------- |
| id             | string      | class UpperCamelCase name in lowerCamelCase | the angularjs singleton id, for injection. By convention, this id should be written in lower camel case. This parameter isn't available for the Angular 2 `Injectable` decorator, but is only here for compatibility purpouse in case of class name shortening during minification. |      |

### angular 1 specificities

This `ng-transition/ng1` module contains all the elements which haven't any Angular 2 equivalent, and are specific to this library.

#### @Module

Define an AngularJS module on a component.

Angular 2 does not have an "internal" module solution anymore. Instead, its rely on an es6 module approach.
We therefore choose to add a specific ``@Module``, which is the only of our decorators that haven't any equivalent in angular 2.

Use this decorator to "extend" the entry component for a module (ie. a folder, if you follow the angularjs guidelines).

It will automatically define a new angularjs module (named after the ``name`` parameter) with the defined ``dependencies``.

##### Basic parameters

| key            | type        | default value              | description                              | example                     |
| -------------- | ----------- | -------------------------- | ---------------------------------------- | --------------------------- |
| name           | string      |                            | module's name / id                       |                             |
| dependencies   | array of modules definition objets or string id -| []  | module's dependencies      |                             |
| templatesDependencies | boolean | true                    | automatically add templates modules as module dependencies (cf. [template handling](#template-handling)) |        |
| configs        | function[]  | []                         | callbacks to call with module.config     |                             | 

##### Component decorator extended parameters

The module decorator define all the required components, directives and services thanks to the following [@Component](#component) parameters :

| key            | type        | default value              | description                              | example                     |
| -------------- | ----------- | -------------------------- | ---------------------------------------- | --------------------------- |
| directives     | class[]     | []                         | array of required directives and components for this module |          |
| providers      | class[]     | []                         | array of required services (cf. [@Injectable](#injectable)) for this module |     |

> :warning: **WARNING**
>
> The directives and providers Component parameters are not evaluated recursively. For now, using them in a ``@Component`` decorator without a direct ``@Module`` decorator will do nothing ! Due to Angular 2 guidelines, this feature isn't planned.

##### Main module

| key            | type        | default value              | description                              | example                     |
| -------------- | ----------- | -------------------------- | ---------------------------------------- | --------------------------- |
| ``main``       | boolean     | false                      | If set to true, this parameter define the module as the "main module", which result in some auto-configuration, and permit to use the following parameters. |         |
| html5mode      | object      |                            | html5mode configuration object           |                             |
| debug          | boolean     | false                      | activate debug mode if true              |                             |
    
> :warning: **WARNING**
>
> the debug parameter needs to be set to false in production

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

| key            | type        | default value              | description                              | example                     |
| -------------- | ----------- | -------------------------- | ---------------------------------------- | --------------------------- |
| name           | string      | component name             | state name                               |                             |
| component      | string / object      |                   | Component object, used to define the state template or es6 import string reference to the component definition, for lazy loading                              |                             |
| lazy           | boolean     | false                      | force lazy loading if true. If true, require a string component parameter.                               |                             |
| useAsDefault           | boolean      | false             | use this state as default - incompatible with lazy loading                           |                             |

All the others ui-router and ui-router-extras parameters (template, templateUrl, controller, parent ...) are availables, and override the previous parameters.

##### Example

```javascript
@Routes([
    {name: 'admin.builder', path: '/builder', component: BuilderComponent},
    {name: 'admin.users', path: '/users', component: UsersComponent}
])
```
