const ctx = [];

export function getVan() {
  const van = ctx[ctx.length - 1];
  if (van) {
    return van;
  }
  throw new Error('getVan() must be called in a wrapper function')
}

export function vanWrap(van, cb) {
  ctx.push(van);
  const ret = cb(van);
  ctx.pop();
  return ret;
}


export function vanWrapper(cb) {
  const van = getVan();
  return (...opt) => vanWrap(van, () => cb(...opt));
}
