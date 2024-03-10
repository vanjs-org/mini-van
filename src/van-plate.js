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

const plainValue = (v, k) => {
  let protoOfV = protoOf(v ?? 0)
  return protoOfV === stateProto ? v.val :
    protoOfV !== funcProto || k?.startsWith("on") ? v : v()
}

const elementProto = {
  renderToBuf(buf) {
    buf.push(`<${this.name}${this.propsStr}>`)
    if (noChild[this.name]) return
    for (const c of this.children) {
      const plainC = plainValue(c)
      protoOf(plainC) === elementProto ? plainC.renderToBuf(buf) :
        buf.push((this.name === "script" ? x => x : escape)(plainC.toString()))
    }
    buf.push(`</${this.name}>`)
  },

  render() {
    const buf = []
    this.renderToBuf(buf)
    return buf.join("")
  },
}

const tag = (name, ...args) => {
  const [props, ...children] = protoOf(args[0] ?? 0) === objProto ? args : [{}, ...args]
  const propsStr = Object.entries(props).map(([k, v]) => {
    const plainV = plainValue(v, k), lowerK = k.toLowerCase()
    return typeof plainV === "boolean" ? (plainV ? " " + lowerK : "") :
      // Disable setting attribute for function-valued properties (mostly event handlers),
      // as they're usually not useful for SSR (server-side rendering).
      protoOf(plainV) !== funcProto ? ` ${lowerK}=${JSON.stringify(escapeAttr(plainV.toString()))}` : ""
  }).join("")
  return {__proto__: elementProto, name, propsStr,
    children: children.flat(Infinity).filter(c => c != null)}
}

const handler = {get: (_, name) => tag.bind(null, name)}
const tags = new Proxy(_ => new Proxy(tag, handler), handler)

const add = (dom, ...children) => {
  dom.children.push(...children.flat(Infinity).filter(c => c != null))
  return dom
}

export default {
  add, tags, state, derive: f => state(f()),
  html: (...args) => {
    const buf = ["<!DOCTYPE html>"]
    tags.html(...args).renderToBuf(buf)
    return buf.join("")
  }
}
