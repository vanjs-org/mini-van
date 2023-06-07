(() => {
  // mini-van.js
  var Obj = Object;
  var vanWithDoc = (doc) => {
    let toDom = (v) => v.nodeType ? v : doc.createTextNode(v);
    let _result = {
      add: (dom, ...children) => {
        for (let child of children.flat(Infinity))
          dom.appendChild(toDom(child));
        return dom;
      },
      tags: new Proxy((name, ...args) => {
        let [props, ...children] = args[0]?.constructor === Obj ? args : [{}, ...args];
        let dom = doc.createElement(name);
        for (let [k, v] of Obj.entries(props))
          dom[k] !== void 0 ? dom[k] = v : dom.setAttribute(k, v);
        return _result.add(dom, ...children);
      }, { get: (tag, name) => tag.bind(null, name) }),
      "html": (...args) => "<!DOCTYPE html>" + _result.tags.html(...args).outerHTML
    };
    return _result;
  };
  var mini_van_default = {
    "vanWithDoc": vanWithDoc,
    ...vanWithDoc(typeof window !== "undefined" ? window.document : null)
  };

  // mini-van.forbundle.js
  window.van = mini_van_default;
})();
