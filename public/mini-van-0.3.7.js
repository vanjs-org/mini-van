/// <reference types="./mini-van.d.ts" />

// This file consistently uses `let` keyword instead of `const` for reducing the bundle size.

// Aliasing some builtin symbols to reduce the bundle size.
let Obj = Object, _undefined

let vanWithDoc = doc => {
  let toDom = v => v.nodeType ? v : doc.createTextNode(v)

  let _result = {
    add: (dom, ...children) => {
      for (let child of children.flat(Infinity))
        if (child != _undefined) dom.appendChild(toDom(child))
      return dom
    },

    tags: new Proxy((name, ...args) => {
      let [props, ...children] = args[0]?.constructor === Obj ? args : [{}, ...args]
      let dom = doc.createElement(name)
      for (let [k, v] of Obj.entries(props))
        dom[k] !== undefined ? dom[k] = v : dom.setAttribute(k, v)
      return _result.add(dom, ...children)
    }, {get: (tag, name) => tag.bind(null, name)}),

    "html": (...args) => "<!DOCTYPE html>" + _result.tags.html(...args).outerHTML,
  }
  return _result
}

export default {"vanWithDoc": vanWithDoc,
  ...vanWithDoc(typeof window !== "undefined" ? window.document : null)}
