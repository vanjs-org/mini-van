export const env = {};
export const registerEnv = (input) => {
    if (input.van)
        env.van = input.van;
    if (input.vanX)
        env.vanX = input.vanX;
};
export const dummyVanX = {
    calc: f => f(),
    reactive: obj => obj,
    noreactive: obj => obj,
    stateFields: (obj) => {
        const states = Array.isArray(obj) ? [] : { __proto__: Object.getPrototypeOf(obj) };
        for (const [k, v] of Object.entries(obj))
            states[k] = env.van.state(v);
        return states;
    },
    raw: obj => obj,
    list: (container, items, itemFunc) => {
        if (container instanceof Function)
            container = container();
        const isArray = Array.isArray(items);
        for (const [k, v] of Object.entries(items))
            env.van.add(container, itemFunc(env.van.state(v), () => { }, (isArray ? Number(k) : k)));
        return container;
    },
    replace: obj => obj,
    compact: obj => obj,
};
