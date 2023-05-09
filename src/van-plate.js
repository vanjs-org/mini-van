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

const escape = s => {
  const map = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
  }
  return s.replace(/[&<>]/g, tag => map[tag] || tag)
}

const elementProto = {
  render() {
    return noChild[this.name] ?
      `<${this.name}${this.propsStr}>` :
      `<${this.name}${this.propsStr}>${this.childrenStrs.join("")}</${this.name}>`
  }
}

const toStr = children => children.flat(Infinity).map(
  c => Object.getPrototypeOf(c) === elementProto ? c.render() : escape(c.toString())).join("")

const tags = new Proxy((name, ...args) => {
  const [props, ...children] = Object.getPrototypeOf(args[0] ?? 0) === Object.prototype ?
    args : [{}, ...args]
  const propsStr = Object.entries(props).map(([k, v]) =>
    typeof v === "boolean" ?
    (v ? " " + k : "") : ` ${k}=${JSON.stringify(v)}`).join("")
  return {__proto__: elementProto, name, propsStr,
    childrenStrs: children.length > 0 ? [toStr(children)] : []}
}, { get: (tag, name) => tag.bind(null, name) })

const add = (dom, ...children) => {
  if (children.length > 0) dom.childrenStrs.push(toStr(children))
  return dom
}

const html = (...args) => "<!DOCTYPE html>" + tags.html(...args).render()

export default {add, tags, html}
