# **Mini-Van**: A Minimalist Template Engine for DOM Generation, working for both Client-side and Server-side Rendering

**Mini-Van** is an ***ultra-lightweight*** template engine for DOM composition and manipulation. With only 0.5kB in the minized bundle size, **Mini-Van** enables you to build comprehensive UI with elegant and expressive vanilla JavaScript code:

```javascript
// Reusable components can be just pure vanilla JavaScript functions.
// Here we capitalize the first letter to follow React conventions.
const Hello = () => div(
  p("👋Hello"),
  ul(
    li("🗺️World"),
    li(a({href: "https://vanjs.org/"}, "🍦VanJS")),
  ),
)

van.add(document.body, Hello())
// Alternatively, you can write:
// document.body.appendChild(Hello())
```

[Try on jsfiddle](https://jsfiddle.net/gh/get/library/pure/vanjs-org/vanjs-org.github.io/tree/master/jsfiddle/minivan/hello)

You can convert any HTML snippet into **Mini-Van** code with our online [converter](https://vanjs.org/convert).

**Mini-Van** is the slimmed-down version of [**VanJS**](https://vanjs.org), which aims to provide an ***ultra-lightweight***, ***zero-dependency***, and ***unopinionated*** Reactive UI framework based on pure vanilla JavaScript and DOM. Compared to **VanJS**, **Mini-Van** further reduces the bundle size to 0.5kB and can be used on the server-side as a [template engine](https://en.wikipedia.org/wiki/Web_template_system).

## Server-Side: Deno Integration

**Mini-Van** can be used on the server side as a template engine to render dynamic web content for HTTP servers. If you use Deno, the integration is fairly straightforward.

There are 2 modes for server-side integration: `van-plate` mode (based on text templating, thus doesn't need the DOM dependency), and `mini-van` mode (based on DOM, thus needs the DOM dependency).

### `van-plate` mode

In `van-plate` mode, HTML content is generated purely through text templating. It can be easily integrated with your HTTP server to render dynamic web content. See the sample code below:

```typescript
import { serve } from "https://deno.land/std@0.184.0/http/server.ts"
import van from "https://deno.land/x/minivan@0.2.8/src/van-plate.js"

const {a, body, li, p, ul} = van.tags

const port = 8080

console.log("Testing DOM rendering...")
// Expecting `<a href="https://vanjs.org/">🍦VanJS</a>` in the console
console.log(a({href: "https://vanjs.org/"}, "🍦VanJS").render())

console.log(`HTTP webserver running. Access it at: http://localhost:${port}/`)
await serve(req => new Response(
  van.html(
    body(
      p("Your user-agent is: ", req.headers.get("user-agent") ?? "Unknown"),
      p("👋Hello"),
      ul(
        li("🗺️World"),
        li(a({href: "https://vanjs.org/"}, "🍦VanJS")),
      ),
    ),
  ),
  {
    status: 200,
    headers: {"content-type": "text/html; charset=utf-8"},
  },
), {port})
```

As illustrated in the example, `render` method can be called on the object returned from the [`tag function`](https://vanjs.org/tutorial#api-tags) to generate a `string` that can be used for serving.

`van.html` is a helper function defined in `van-plate.js` that is equivalent to:

```javascript
(...args) => "<!DOCTYPE html>" + tags.html(...args).render()
```

### `mini-van` mode

The behavior in `mini-van` mode is similar to the behavior in browser context. i.e.: DOM objects will be created by [`tag functions`](https://vanjs.org/tutorial#api-tags). As Deno doesn't have the built-in support for DOM objects, you need to provide a 3rd-party `Document` object before integrating with **Mini-Van** in this mode.

There are multiple 3rd-party options for the `Document` object. In the example below, we will demonstrate the integration with the help of [deno-dom](https://deno.com/manual@v1.28.1/advanced/jsx_dom/deno_dom):

```typescript
import { serve } from "https://deno.land/std@0.184.0/http/server.ts"
import { DOMParser } from "https://deno.land/x/deno_dom@v0.1.38/deno-dom-wasm.ts"
import van from "https://deno.land/x/minivan@0.2.8/src/mini-van.js"

const document = new DOMParser().parseFromString("", "text/html")!
const {tags, html} = van.vanWithDoc(document)
const {a, body, li, p, ul} = tags

const port = 8080

console.log("Testing DOM rendering...")
const anchorDom = a({href: "https://vanjs.org/"}, "🍦VanJS")
// anchorDom is an HTMLAnchorElement
// Expecting `<a href="https://vanjs.org/">🍦VanJS</a>` printed in the console
console.log(anchorDom.outerHTML)

console.log(`HTTP webserver running. Access it at: http://localhost:${port}/`)
await serve(req => new Response(
  html(
    body(
      p("Your user-agent is: ", req.headers.get("user-agent") ?? "Unknown"),
      p("👋Hello"),
      ul(
        li("🗺️World"),
        li(a({href: "https://vanjs.org/"}, "🍦VanJS")),
      ),
    ),
  ),
  {
    status: 200,
    headers: {"content-type": "text/html; charset=utf-8"},
  },
), {port})
```

Similar to `van-plate` mode, we have a helper function `html` defined in `mini-van.js` which is equivalent to:

```javascript
(...args) => "<!DOCTYPE html>" + tags.html(...args).outerHTML
```

## Client-Side: Getting Started

To get started on the client side, download the latest version [`mini-van-0.2.8.min.js`](https://vanjs.org/autodownload?file=mini-van-0.2.8.min.js) and add the line below to your script:

```javascript
import van from "./mini-van-0.2.8.min.js"
```

To code without ES6 modules, you can download the bundled version [`mini-van-0.2.8.nomodule.min.js`](https://vanjs.org/autodownload?file=mini-van-0.2.8.nomodule.min.js) and add the following line to your HTML file instead:

```html
<script type="text/javascript" src="mini-van-0.2.8.nomodule.min.js"></script>
```

You can find all relevant **Mini-Van** files in this [Download Table](https://vanjs.org/minivan#download-table).

## API Reference

**Mini-Van** exposes the same set of APIs as **VanJS** for DOM composition and manipulation. Thus for API reference, you can refer to [DOM Composition and Manipulation](https://vanjs.org/tutorial#dom) section of **VanJS** tutorial. Note that: state and state binding are not supported in **Mini-Van**.
