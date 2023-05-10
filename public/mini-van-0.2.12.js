/// <reference types="./mini-van.d.ts" />

// This file consistently uses `let` keyword instead of `const` for reducing the bundle size.

// Aliasing some builtin symbols to reduce the bundle size.
let Obj = Object

let vanWithDoc = doc => {
  let toDom = v => v.nodeType ? v : doc.createTextNode(v)

  let _result = {
    add: (dom, ...children) => (
      children.flat(Infinity).forEach(child => dom.appendChild(toDom(child))), dom),

    tags: new Proxy((name, ...args) => {
      let [props, ...children] = args[0]?.constructor === Obj ? args : [{}, ...args]
      let dom = doc.createElement(name)
      Obj.entries(props).forEach(([k, v]) =>
        dom[k] !== undefined ? dom[k] = v : dom.setAttribute(k, v))
      return _result.add(dom, ...children)
    }, {get: (tag, name) => tag.bind(null, name)}),

    "html": (...args) => "<!DOCTYPE html>" + _result.tags.html(...args).outerHTML,
  }
  return _result
}

export default {"vanWithDoc": vanWithDoc,
  ...vanWithDoc(typeof window !== "undefined" ? window : null)}
