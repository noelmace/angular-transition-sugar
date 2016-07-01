export let toBinding = (params, type) => {
    let bindings = {};
    if (params) {
        params.forEach((param) => {
            let id = param, value = '';
            if (param.includes(': ')) {
                param.split(': ');
                [id, value] = param;
            }
            bindings[id] = type + value;
        });
    }
    return bindings;
};
