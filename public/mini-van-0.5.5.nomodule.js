(() => {
  // mini-van.js
  var protoOf = Object.getPrototypeOf;
  var _undefined;
  var funcProto = protoOf(protoOf);
  var stateProto = { get oldVal() {
    return this.val;
  } };
  var objProto = protoOf(stateProto);
  var state = (initVal) => ({ __proto__: stateProto, val: initVal });
  var plainValue = (k, v) => {
    let protoOfV = protoOf(v ?? 0);
    return protoOfV === stateProto ? v.val : protoOfV !== funcProto || k?.startsWith("on") ? v : v();
  };
  var add = (dom, ...children) => (dom.append(...children.flat(Infinity).map(plainValue.bind(_undefined, _undefined)).filter((c) => c != _undefined)), dom);
  var vanWithDoc = (doc) => {
    let tag = (ns, name, ...args) => {
      let [props, ...children] = protoOf(args[0] ?? 0) === objProto ? args : [{}, ...args];
      let dom = ns ? doc.createElementNS(ns, name) : doc.createElement(name);
      for (let [k, v] of Object.entries(props)) {
        let plainV = plainValue(k, v);
        protoOf(plainV) !== funcProto && dom.setAttribute(k, plainV);
      }
      return add(dom, ...children);
    };
    let handler = (ns) => ({ get: (_, name) => tag.bind(_undefined, ns, name) });
    let tags = new Proxy((ns) => new Proxy(tag, handler(ns)), handler());
    return {
      add,
      tags,
      state,
      derive: (f) => state(f()),
      html: (...args) => "<!DOCTYPE html>" + tags.html(...args).outerHTML
    };
  };
  var mini_van_default = {
    "vanWithDoc": vanWithDoc,
    ...vanWithDoc(typeof window !== "undefined" ? window.document : null)
  };

  // mini-van.forbundle.js
  window.van = mini_van_default;
})();
