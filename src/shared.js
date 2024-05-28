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
  try {
    const ret = cb(van);
    return ret;
  } finally {
    ctx.pop();
  }
}


export function vanWrapper(cb) {
  const van = getVan();
  return (...opt) => vanWrap(van, () => cb(...opt));
}

export function useGlobalVan(van) {
  ctx.push(van);
  return () => ctx.splice(ctx.indexOf(van), 1);
}
