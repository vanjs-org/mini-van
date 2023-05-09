// This file consistently uses `let` keyword instead of `const` for reducing the bundle size.

let Obj = Object

let toDom = v => v.nodeType ? v : new Text(v)

let vanWithDoc = doc => {
  let _result = {
    add: (dom, ...children) => children.flat(Infinity).forEach(child => dom.appendChild(
      toDom(child))),

    tags: new Proxy((name, ...args) => {
      let [props, ...children] = args[0]?.constructor === Obj ? args : [{}, ...args]
      let dom = doc.createElement(name)
      Obj.entries(props).forEach(([k, v]) =>
        dom[k] !== undefined ? dom[k] = v : dom.setAttribute(k, v))
      _result.add(dom, ...children)
      return dom
    }, {get: (tag, name) => tag.bind(null, name)})
  }
  return _result
}

let van = vanWithDoc(document)
van["vanWithDoc"] = vanWithDoc

export default van
