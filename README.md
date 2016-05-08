# angularjs-decorators

Angular 2 inspired decorators for angularjs.

*This is a Work In Progress ! Please, do not hesitate to report bugs or feature requests.*

## How To

### install

``jspm i decorators=github:noelmace/angularjs-decorators``

### Component decorator

This decorator use 3 new parameters :
- selector : the 'name' / selector of the component
- inputs : '<' bindings parameters, angular 2 style
    ``inputs: [ 'toto: tutu' ]`` will be translated to ``bindings: { toto: '<tutu' }``
- outputs : same as inputs, but with callbacks ('&')

Then, all the other 'angularjs classic' component parameters (template, templateUrl, transclude, etc ...) will be merged with the generated configuration.

Of course, the decorated class is used as the component controller.

```
import Component from 'decorators/Component';
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
export default cless MyComponent {

    constructor() {

    }
}
```

This decorator add 2 attributes to the class :
- $selector
- and $componentConfig (angularjs component configuration object)

Use them as follow :

```
import MyComponent from 'app/my-component.component';

angular.module('myModule', [])
.component(MyComponent.$selector, MyComponent.$componentConfig);
```

### Directive decorator

This decorator behave like ``@Component``, but for "attribute directives".

It simply put the provided configuration object in $directiveConfig, but also offer different default values than the default angularjs behaviour, following angular best practices for upgrade to Angular 2 :
- default ``restrict`` value is 'A'
- default ``controllerAs`` value is '$ctrl'

### resources

You can find usage examples in [sdn-angularjs-seed](https://github.com/Sedona-Solutions/sdn-angularjs-seed);
