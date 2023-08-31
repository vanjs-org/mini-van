/// <reference types="./van-plate.d.ts" />

const noChild = {
  input: 1,
  meta: 1,
  br: 1,
  link: 1,
  img: 1,
  hr: 1,
  area: 1,
  base: 1,
  col: 1,
  param: 1,
  wbr: 1,
  track: 1,
  source: 1,
  embed: 1,
  command: 1,
  keygen: 1,
}

const escapeMap = {
  '&': '&amp;',
  '<': '&lt;',
  '>': '&gt;',
}

const escape = s => s.replace(/[&<>]/g, tag => escapeMap[tag] || tag)

const escapeAttr = v => v.replace(/"/g, "&quot;")

const protoOf = Object.getPrototypeOf, funcProto = protoOf(protoOf), objProto = protoOf(noChild)

const stateProto = {get oldVal() { return this.val }}

const state = initVal => ({__proto__: stateProto, val: initVal})

const val = s => protoOf(s ?? 0) === stateProto ? s.val : s

const plainValue = (v, k) => {
  let protoOfV = protoOf(v ?? 0)
  return protoOfV === stateProto ? v.val :
    protoOfV === funcProto && (!k?.startsWith("on") || v._isBindingFunc) ? v() : v
}

const elementProto = {
  render() {
    return noChild[this.name] ?
      `<${this.name}${this.propsStr}>` :
      `<${this.name}${this.propsStr}>${this.childrenStrs.join("")}</${this.name}>`
  }
}

const toStr = children => children.map(
  c => {
    const plainC = plainValue(c)
    return protoOf(plainC) === elementProto ? plainC.render() : escape(plainC.toString())
  }).join("")

const tags = new Proxy((name, ...args) => {
  const [props, ...children] = protoOf(args[0] ?? 0) === objProto ? args : [{}, ...args]
  const propsStr = Object.entries(props).map(([k, v]) => {
    const plainV = plainValue(v, k), lowerK = k.toLowerCase()
    return typeof plainV === "boolean" ? (plainV ? " " + lowerK : "") :
      // Disable setting attribute for function-valued properties (mostly event handlers),
      // as they're usually not useful for SSR (server-side rendering).
      protoOf(plainV) !== funcProto ? ` ${lowerK}=${JSON.stringify(escapeAttr(plainV.toString()))}` : ""
  }).join("")
  const flattenedChildren = children.flat(Infinity).filter(c => c != null)
  return {__proto__: elementProto, name, propsStr,
    childrenStrs: flattenedChildren.length > 0 ? [toStr(flattenedChildren)] : []}
}, { get: (tag, name) => tag.bind(null, name) })

const add = (dom, ...children) => {
  children = children.flat(Infinity).filter(c => c != null)
  if (children.length > 0) dom.childrenStrs.push(toStr(children))
  return dom
}

export default {
  add, _: f => (f._isBindingFunc = 1, f), tags, tagsNS: () => tags, state,
  val, oldVal: val, derive: f => state(f()),
  html: (...args) => "<!DOCTYPE html>" + tags.html(...args).render()
}
