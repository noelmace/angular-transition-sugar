# NG2 Syntax

(*Nearly*) **Production ready Angular 2 syntax for angularjs.**

*This is a Work In Progress ! Please, do not hesitate to report bugs or feature requests.*

## install

``jspm i ng2-syntax=github:noelmace/ng2-syntax``

### SystemJS Configuration

#### With Bundle (HTTP/1)

If you want to use the bundle, you just have to add this values to your systemjs configuration file :

```javascript
{
    bundles: {
        "ng2-syntax": [
            "ng2-syntax/core",
            "ng2-syntax/platform-browser-dynamic"
        ]
    }
}
```

#### Without Bundle (HTTP/2)

If you DON'T want to use the bundle, add this to your configuration :

```javascript
{
    map: {
        "ng2-syntax": "ng2-syntax/all"
    }
}
```

## dependencies

This project require :
* babeljs (with polyfill and decorators support) or typescript
* SystemJS
* Angularjs 1.5+
* (for IE9+ compatibility) a function.name polyfill (babel-polyfill do the trick, thanks to core-js es6.function.name)

We recommend the use of jspm for dependencies management.

### template handling

The best template solution with noelmace/angularjs-decorators is the following :
use an angular template caching solution, like gulp-ng-html2js, which will transform each html template to a new angularjs module, whose name will be the template 'url'.

Here is a configuration example :

```
gHtml2Js({
  template: "import angular from 'angular';\n" +
    "export default angular.module('<%= moduleName %>', []).run(['$templateCache', function($templateCache) {\n" +
    "   $templateCache.put('<%= template.url %>',\n    '<%= template.prettyEscapedContent %>');\n" +
    "}]);\n"
}
```

The module will be automatically added to you module dependencies (see ``@Module``).

**/!\** don't forget to import it in your component definition file, just like that :
```
import template from 'app/app.component.tpl';

@Component({
    ...
    templateUrl: template.name
})
```

If you prefer to use another solution, set the ``templatesDependencies`` parameter to false for every module.

## How to use the decorators

### Component

Define an angularjs 1.5 component.

#### Parameters

- selector : the 'name' / selector of the component
- inputs : '<' bindings parameters, angular 2 style
    ``inputs: [ 'toto: tutu' ]`` will be translated to ``bindings: { toto: '<tutu' }``
- outputs : same as inputs, but with callbacks ('&')
- directives / providers : cf. Module

Then, all the other 'angularjs classic' component parameters (template, templateUrl, transclude, etc ...) will be merged with the generated configuration.

Of course, the decorated class is used as the component controller.

#### Example

```javascript
import { Component } from 'ng2-syntax/core';
import template from './my-component.component.tpl';

@Component({
    selector: 'myComponent',
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
export default class MyComponent {

    constructor() {

    }
}
```

### Directive

This decorator behave like ``@Component``, but for "attribute directives".

It simply put the provided configuration object in $directiveConfig, but also offer different default values than the default angularjs behaviour, following angular best practices for upgrade to Angular 2 :
- default ``restrict`` value is 'A'
- default ``controllerAs`` value is '$ctrl'

### Module

Define an angularjs module on a component.

Angular 2 does not have an "internal" module solution anymore. Instead, its rely on an es6 module approach.
We therefore choose to add a specific ``@Module``, which is the only of our decorators that haven't any equivalent in angular 2.

Use this decorator to "extend" the entry component for a module (ie. a folder, if you follow the angularjs guidelines).

It will automatically define a new angularjs module (named after the ``name`` parameter) with the defined ``dependencies``.

#### Basic parameters

* name (string): module's name / id
* dependencies (array of modules definition objets or string id - default []) : module's dependencies
* templatesDependencies (boolean - default true) : automatically add templates modules as module dependencies (cf. template handling)
* configs (array of functions - default []) : callback to call with module.config

#### Component decorator extended parameters

The module decorator define all the required components, directives and services thanks to the following ``@Component`` parameters :
* directives : array of required directives and components for this module
* providers : array of required services (cf. ``@Injectable``) for this module

**/!\** *The directives and providers Component parameters are not evaluated recursively. For now, using them in a ``@Component`` decorator without a direct ``@Module`` decorator will do nothing ! Due to Angular 2 guidelines, this feature isn't planned.*

#### Main module

Parameter : ``main`` (boolean - default false)

If set to true, this parameter define the module as the "main module", which result in some auto-configuration, and permit to use the following parameters :
    * html5mode (object) : html5mode configuration object
    * debug (boolean - default to false) : activate debug mode if true - **/!\** need to be set to false in production

#### Example

```javascript
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
```

### Routes

Define component oriented, "``@angular/router`` style" routes via angular-ui-router + permit lazy loading.

#### Parameters

- name : state name (optional - the component name is used by default)
- component :
    - Component object, used to define the state template
    - or es6 import string reference to the component definition, for lazy loading
- lazy : boolean - force lazy loading if true (default to false). If true, require a string component parameter.
- useAsDefault : use this state as default - incompatible with lazy loading
- all other ui-router and ui-router-extras parameters (template, templateUrl, controller, parent ...) are available, and override the previous parameters

#### Example

```javascript
@Routes([
    {name: 'admin.builder', path: '/builder', component: BuilderComponent},
    {name: 'admin.users', path: '/users', component: UsersComponent}
])
```

### Injectable

Permit to define a service. The service id is the result of the conversion of the class UpperCamelCase name to lowerCamelCase.
This service need to be registered in a "Module Component" via the Component's providers array parameter, like with angular 2.
Then, all the injection process simply rely on angularjs. Use ``/* @ngInject */`` or the ``$inject`` class' property.

This decorator has no parameters.

### resources

You can find usage examples in [sdn-angularjs-seed](https://github.com/Sedona-Solutions/sdn-angularjs-seed);

### browser compatibility

A priori, the lib should be compatible with all modern browsers, including IE9+ (via polyfill). However, we haven't run full tests yet. We only can ensure you that it's compatible IE10+, Chrome 50+ and Firefox 45+. Please, open an issue if you find any bug on other browsers.
