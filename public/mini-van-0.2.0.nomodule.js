(() => {
  // mini-van.js
  var Obj = Object;
  var vanWithDoc = (doc) => {
    let toDom = (v) => v.nodeType ? v : doc.createTextNode(v);
    let _result = {
      add: (dom, ...children) => children.flat(Infinity).forEach((child) => dom.appendChild(
        toDom(child)
      )),
      tags: new Proxy((name, ...args) => {
        let [props, ...children] = args[0]?.constructor === Obj ? args : [{}, ...args];
        let dom = doc.createElement(name);
        Obj.entries(props).forEach(([k, v]) => dom[k] !== void 0 ? dom[k] = v : dom.setAttribute(k, v));
        _result.add(dom, ...children);
        return dom;
      }, { get: (tag, name) => tag.bind(null, name) })
    };
    return _result;
  };
  var mini_van_default = { "vanWithDoc": vanWithDoc, ...vanWithDoc(window.document) };

  // mini-van.forbundle.js
  window.van = mini_van_default;
})();
