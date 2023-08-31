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
  var val = (s) => protoOf(s ?? 0) === stateProto ? s.val : s;
  var plainValue = (k, v) => {
    let protoOfV = protoOf(v ?? 0);
    return protoOfV === stateProto ? v.val : protoOfV === funcProto && (!k?.startsWith("on") || v._isBindingFunc) ? v() : v;
  };
  var add = (dom, ...children) => (dom.append(...children.flat(Infinity).map(plainValue.bind(_undefined, _undefined)).filter((c) => c != _undefined)), dom);
  var vanWithDoc = (doc) => {
    let tagsNS = (ns) => new Proxy((name, ...args) => {
      let [props, ...children] = protoOf(args[0] ?? 0) === objProto ? args : [{}, ...args];
      let dom = ns ? doc.createElementNS(ns, name) : doc.createElement(name);
      for (let [k, v] of Object.entries(props)) {
        let plainV = plainValue(k, v);
        protoOf(plainV) !== funcProto && dom.setAttribute(k, plainV);
      }
      return add(dom, ...children);
    }, { get: (tag, name) => tag.bind(null, name) });
    let tags = tagsNS();
    return {
      add,
      _: (f) => (f._isBindingFunc = 1, f),
      tags,
      tagsNS,
      state,
      val,
      oldVal: val,
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
