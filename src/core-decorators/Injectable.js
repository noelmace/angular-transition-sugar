import { upperToLowerCamel } from './utils/strings';

export function Injectable(config) {
    return function decorator(ctrl) {
        ctrl.$kissDecoratorsConfig = { injectableId: config.id || upperToLowerCamel(ctrl.name) };
    }
}
