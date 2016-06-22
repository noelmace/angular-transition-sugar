import ComponentDecorator from './decorators/Component';
import DirectiveDecorator from './decorators/Directive';
import InjectableDecorator from './decorators/Injectable';
import ModuleDecorator from './decorators/Module';
import RoutesDecorator from './decorators/Routes';

export let Component = ComponentDecorator;
export let Directive = DirectiveDecorator;
export let Injectable = InjectableDecorator;
export let Module = ModuleDecorator;
export let Routes = RoutesDecorator;
