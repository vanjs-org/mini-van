/// <reference types="./mini-van.d.ts" />

// This file consistently uses `let` keyword instead of `const` for reducing the bundle size.

// Aliasing some builtin symbols to reduce the bundle size.
let protoOf = Object.getPrototypeOf, _undefined, funcProto = protoOf(protoOf)

let stateProto = {get oldVal() { return this.val }}, objProto = protoOf(stateProto)

let state = initVal => ({__proto__: stateProto, val: initVal})

let plainValue = (k, v) => {
  let protoOfV = protoOf(v ?? 0)
  return protoOfV === stateProto ? v.val :
    protoOfV !== funcProto || k?.startsWith("on") ? v : v()
}

let add = (dom, ...children) =>
  (dom.append(...children.flat(Infinity)
    .map(plainValue.bind(_undefined, _undefined))
    .filter(c => c != _undefined)),
  dom)

let vanWithDoc = doc => {
  let tag = (ns, name, ...args) => {
    let [props, ...children] = protoOf(args[0] ?? 0) === objProto ? args : [{}, ...args]
    let dom = ns ? doc.createElementNS(ns, name) : doc.createElement(name)
    for (let [k, v] of Object.entries(props)) {
      let plainV = plainValue(k, v)
      // Disable setting attribute for function-valued properties (mostly event handlers),
      // as they're usually not useful for SSR (server-side rendering).
      protoOf(plainV) !== funcProto && dom.setAttribute(k, plainV)
    }
    return add(dom, ...children)
  }

  let handler = ns => ({get: (_, name) => tag.bind(_undefined, ns, name)})
  let tags = new Proxy(ns => new Proxy(tag, handler(ns)), handler())

  return {
    add, tags, state, derive: f => state(f()),
    html: (...args) => "<!DOCTYPE html>" + tags.html(...args).outerHTML,
  }
}

export default {"vanWithDoc": vanWithDoc,
  ...vanWithDoc(typeof window !== "undefined" ? window.document : null)}
