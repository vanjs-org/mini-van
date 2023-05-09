(() => {
  // mini-van.js
  var Obj = Object;
  var toDom = (v) => v.nodeType ? v : new Text(v);
  var vanWithDoc = (doc) => {
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
  var van = vanWithDoc(document);
  van["vanWithDoc"] = vanWithDoc;
  var mini_van_default = van;

  // mini-van.forbundle.js
  window.van = mini_van_default;
})();
