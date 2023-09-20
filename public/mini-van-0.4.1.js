/// <reference types="./mini-van.d.ts" />

// This file consistently uses `let` keyword instead of `const` for reducing the bundle size.

// Aliasing some builtin symbols to reduce the bundle size.
let protoOf = Object.getPrototypeOf, _undefined, funcProto = protoOf(protoOf)

let stateProto = {get oldVal() { return this.val }}, objProto = protoOf(stateProto)

let state = initVal => ({__proto__: stateProto, val: initVal})

let val = s => protoOf(s ?? 0) === stateProto ? s.val : s

let plainValue = (k, v) => {
  let protoOfV = protoOf(v ?? 0)
  return protoOfV === stateProto ? v.val :
    protoOfV === funcProto && (!k?.startsWith("on") || v._isBindingFunc) ? v() : v
}

let add = (dom, ...children) =>
  (dom.append(...children.flat(Infinity)
    .map(plainValue.bind(_undefined, _undefined))
    .filter(c => c != _undefined)),
  dom)

let vanWithDoc = doc => {
  let tagsNS = ns => new Proxy((name, ...args) => {
    let [props, ...children] = protoOf(args[0] ?? 0) === objProto ? args : [{}, ...args]
    let dom = ns ? doc.createElementNS(ns, name) : doc.createElement(name)
    for (let [k, v] of Object.entries(props)) {
      let plainV = plainValue(k, v)
      // Disable setting attribute for function-valued properties (mostly event handlers),
      // as they're usually not useful for SSR (server-side rendering).
      protoOf(plainV) !== funcProto && dom.setAttribute(k, plainV)
    }
    return add(dom, ...children)
  }, {get: (tag, name) => tag.bind(null, name)})

  let tags = tagsNS()

  return {
    add, _: f => (f._isBindingFunc = 1, f), tags, tagsNS, state,
    val, oldVal: val, derive: f => state(f()),
    html: (...args) => "<!DOCTYPE html>" + tags.html(...args).outerHTML,
  }
}

export default {"vanWithDoc": vanWithDoc,
  ...vanWithDoc(typeof window !== "undefined" ? window.document : null)}
