import van from "mini-van-plate/van-plate"

const {html, tags: {a, aside, b, body, br, code, div, h1, h2, h3, head, header, hr, i, img, li, link, meta, nav, p, path, pre, script, span, svg, table, tbody, td, th, thead, title, tr, ul}} = van

export default () => html(
  head(
    link({rel: "icon", href: "/logo.svg"}),
    title(
      "Mini-Van - A Minimalist Template Engine for Client/Server-side Rendering",
    ),
    meta({charset: "UTF-8"}),
    meta({name: "viewport", content: "width=device-width, initial-scale=1"}),
    link({rel: "stylesheet", href: "/w3.css"}),
    link({rel: "stylesheet", href: "/font.css"}),
    link({rel: "stylesheet", href: "/prism.css"}),
    link({rel: "stylesheet", href: "/vanjs.css"}),
  ),
  body({class: "line-numbers", "data-prismjs-copy": "📋"},
    script({async: "", src: "https://www.googletagmanager.com/gtag/js?id=G-Q0NB75RY7E"}),
    script(
      "\n      window.dataLayer = window.dataLayer || [];\n      function gtag(){dataLayer.push(arguments);}\n      gtag('js', new Date());\n\n      gtag('config', 'G-Q0NB75RY7E');\n    ",
    ),
    nav({class: "w3-sidebar w3-red w3-collapse w3-top w3-large w3-padding", style: "z-index:3;width:280px;font-weight:bold;", id: "mySidebar"},
      br(),
      a({href: "javascript:void(0)", onclick: "w3_close()", class: "w3-button w3-hide-large w3-display-topleft", style: "width:100%;font-size:22px"},
        "Close Menu",
      ),
      div({class: "w3-container"},
        h1({class: "w3-padding-16 w3-xxxlarge"},
          img({src: "/logo.svg", alt: "VanJS", width: "192px", height: "192px"}),
        ),
      ),
      div({id: "nav", class: "w3-bar-block"},
        a({href: "/", onclick: "w3_close()", class: "w3-bar-item w3-button w3-hover-white"},
          "Home",
        ),
        a({href: "/start", onclick: "w3_close()", class: "w3-bar-item w3-button w3-hover-white"},
          "Getting Started",
        ),
        a({href: "/tutorial", onclick: "w3_close()", class: "w3-bar-item w3-button w3-hover-white"},
          "Tutorial",
        ),
        a({href: "/demo", onclick: "w3_close()", class: "w3-bar-item w3-button w3-hover-white"},
          "VanJS by Example",
        ),
        a({href: "/convert", onclick: "w3_close()", class: "w3-bar-item w3-button w3-hover-white"},
          "HTML/MD to VanJS",
        ),
        a({href: "/vanui", onclick: "w3_close()", class: "w3-bar-item w3-button w3-hover-white"},
          "VanUI",
        ),
        a({href: "/minivan", onclick: "w3_close()", class: "w3-bar-item w3-button w3-hover-white current"},
          "Mini-Van",
        ),
        a({href: "/ssr", onclick: "w3_close()", class: "w3-bar-item w3-button w3-hover-white"},
          "SSR & Hydration",
        ),
        a({href: "/advanced", onclick: "w3_close()", class: "w3-bar-item w3-button w3-hover-white"},
          "Advanced Topics",
        ),
        a({href: "/media", onclick: "w3_close()", class: "w3-bar-item w3-button w3-hover-white"},
          "Media Mentions",
        ),
        a({href: "/about", onclick: "w3_close()", class: "w3-bar-item w3-button w3-hover-white"},
          "About",
        ),
      ),
    ),
    header({class: "w3-container w3-top w3-hide-large w3-red w3-xlarge w3-padding"},
      a({href: "javascript:void(0)", class: "w3-button w3-red w3-margin-right", onclick: "w3_open()"},
        "☰",
      ),
      span({id: "title-bar"},
        "Mini-Van",
      ),
    ),
    div({class: "w3-overlay w3-hide-large", onclick: "w3_close()", style: "cursor:pointer", title: "close side menu", id: "myOverlay"}),
    div({class: "w3-main", style: "margin-left:300px;"},
      div({id: "page"},
        div({id: "content"},
          h1({class: "w3-xxlarge"},
            b(
              "Mini-Van",
            ),
            ": A Minimalist Template Engine for Client/Server-side Rendering without JSX",
          ),
          p(
            b(
              "Mini-Van",
            ),
            " is an ",
            b(
              i(
                "ultra-lightweight",
              ),
            ),
            " template engine for DOM composition and manipulation. With only 0.7kB in the minified bundle size (0.5kB gzipped), ",
            b(
              "Mini-Van",
            ),
            " enables you to build comprehensive UI with elegant and expressive vanilla JavaScript code:",
          ),
          pre(
            code({class: "language-js"},
              "// Reusable components can be just pure vanilla JavaScript functions.\n// Here we capitalize the first letter to follow React conventions.\nconst Hello = () => div(\n  p(\"👋Hello\"),\n  ul(\n    li(\"🗺️World\"),\n    li(a({href: \"https://vanjs.org/\"}, \"🍦VanJS\")),\n  ),\n)\n\nvan.add(document.body, Hello())\n// Alternatively, you can write:\n// document.body.appendChild(Hello())\n",
            ),
          ),
          p(
            a({href: "https://jsfiddle.net/gh/get/library/pure/vanjs-org/vanjs-org.github.io/tree/master/jsfiddle/minivan/hello"},
              "Try on jsfiddle",
            ),
          ),
          p(
            "You can convert any HTML snippet into ",
            b(
              "Mini-Van",
            ),
            " code with our online ",
            a({href: "/convert", class: "w3-hover-opacity"},
              "converter",
            ),
            ".",
          ),
          p(
            b(
              "Mini-Van",
            ),
            " is the slimmed-down version of ",
            a({href: "/", class: "w3-hover-opacity"},
              b(
                "VanJS",
              ),
            ),
            ", which aims to provide an ",
            b(
              i(
                "ultra-lightweight",
              ),
            ),
            ", ",
            b(
              i(
                "zero-dependency",
              ),
            ),
            ", and ",
            b(
              i(
                "unopinionated",
              ),
            ),
            " Reactive UI framework based on pure vanilla JavaScript and DOM. Compared to ",
            b(
              "VanJS",
            ),
            ", ",
            b(
              "Mini-Van",
            ),
            " further reduces the gzipped minified bundle size to 0.5kB and (",
            i(
              "more importantly",
            ),
            ") can be used on the server-side as a ",
            a({href: "https://en.wikipedia.org/wiki/Web_template_system", class: "w3-hover-opacity"},
              "template engine",
            ),
            ".",
          ),
          h2({class: "w3-xxlarge w3-text-red", id: "server-side-npm-integration"},
            a({class: "self-link", href: "#server-side-npm-integration"},
              "Server-Side: NPM Integration",
            ),
          ),
          hr({style: "width:50px;border:5px solid red", class: "w3-round"}),
          p(
            b(
              "Mini-Van",
            ),
            " can be used on the server side as a template engine to render dynamic web content for HTTP servers. An NPM package was published here: ",
            a({href: "https://www.npmjs.com/package/mini-van-plate", class: "w3-hover-opacity"},
              "www.npmjs.com/package/mini-van-plate",
            ),
            ". Thus it can be used in ",
            a({href: "https://nodejs.org/", class: "w3-hover-opacity"},
              "Node.js",
            ),
            " or ",
            a({href: "https://bun.sh/", class: "w3-hover-opacity"},
              "Bun",
            ),
            ".",
          ),
          p(
            "There are 2 modes for server-side integration: ",
            code({class: "symbol"},
              "van-plate",
            ),
            " mode (based on text templating, thus doesn't need the DOM dependency), and ",
            code({class: "symbol"},
              "mini-van",
            ),
            " mode (based on DOM, thus needs the DOM dependency).",
          ),
          h3({class: "w3-large w3-text-red", id: "install"},
            a({class: "self-link", href: "#install"},
              "Install",
            ),
          ),
          pre(
            code({class: "language-shell"},
              "npm install mini-van-plate",
            ),
          ),
          h3({class: "w3-large w3-text-red", id: "npm-van-plate"},
            a({class: "self-link", href: "#npm-van-plate"},
              code({class: "symbol"},
                "van-plate",
              ),
              " mode",
            ),
          ),
          p(
            "In ",
            code({class: "symbol"},
              "van-plate",
            ),
            " mode, HTML content is generated purely through text templating. It can be easily integrated with your HTTP server to render dynamic web content. See the sample code below:",
          ),
          pre(
            code({class: "language-js"},
              "import http from \"node:http\"\nimport van from \"mini-van-plate/van-plate\"\n\nconst {a, body, button, input, li, p, ul} = van.tags\n\nconst port = 8080\n\nconsole.log(\"Testing DOM rendering...\")\n// Expecting `<a href=\"https://vanjs.org/\">🍦VanJS</a>` printed in the console\nconsole.log(a({href: \"https://vanjs.org/\"}, \"🍦VanJS\").render())\n// Expecting `<button onclick=\"alert(&quot;Hello&quot;)\">Click</button>` printed in the console\nconsole.log(button({onclick: 'alert(\"Hello\")'}, \"Click\").render())\n// Expecting `<input type=\"text\" value=\"value\">` printed in the console\nconsole.log(input({type: \"text\", value: \"value\"}).render())\n\nconst server = http.createServer((req, res) => {\n  res.statusCode = 200\n  res.setHeader('Content-Type', 'text/html; charset=utf-8')\n  res.end(van.html(\n    body(\n      p(\"Your user-agent is: \", req.headers[\"user-agent\"] ?? \"Unknown\"),\n      p(\"👋Hello\"),\n      ul(\n        li(\"🗺️World\"),\n        li(a({href: \"https://vanjs.org/\"}, \"🍦VanJS\")),\n      ),\n    ),\n  ))\n})\n\nserver.listen(port, () => console.log(`Server running at http://localhost:${port}/`))\n",
            ),
          ),
          p(
            "Preview via ",
            a({href: "https://codesandbox.io/p/sandbox/hopeful-perlman-rh7wvk?file=/van-plate-server.mjs:1,1", class: "w3-hover-opacity"},
              "CodeSandbox",
            ),
            ".",
          ),
          p(
            "As illustrated in the example, ",
            code({class: "symbol"},
              "render",
            ),
            " method can be called on the object returned from the ",
            code({class: "symbol"},
              a({href: "/tutorial#api-tags", class: "w3-hover-opacity"},
                "tag function",
              ),
            ),
            " to generate a ",
            code({class: "symbol"},
              "string",
            ),
            " that can be used for serving.",
          ),
          p(
            code({class: "symbol"},
              "van.html",
            ),
            " is a helper function defined in ",
            code({class: "symbol"},
              "van-plate.js",
            ),
            " that is equivalent to:",
          ),
          pre(
            code({class: "language-js"},
              "(...args) => \"<!DOCTYPE html>\" + tags.html(...args).render()",
            ),
          ),
          p(),
          h3({class: "w3-large w3-text-red", id: "npm-mini-van"},
            a({class: "self-link", href: "#npm-mini-van"},
              code({class: "symbol"},
                "mini-van",
              ),
              " mode",
            ),
          ),
          p(
            "The behavior in ",
            code({class: "symbol"},
              "mini-van",
            ),
            " mode is similar to the behavior in browser context. i.e.: DOM objects will be created by ",
            code({class: "symbol"},
              a({href: "/tutorial#api-tags", class: "w3-hover-opacity"},
                "tag functions",
              ),
            ),
            ". As Node doesn't have the built-in support for DOM objects, you need to provide a 3rd-party ",
            code({class: "symbol"},
              "Document",
            ),
            " object before integrating with ",
            b(
              "Mini-Van",
            ),
            " in this mode.",
          ),
          p(
            "There are multiple 3rd-party options for the ",
            code({class: "symbol"},
              "Document",
            ),
            " object. In the example below, we will demonstrate the integration with the help of ",
            code({class: "symbol"},
              a({href: "https://www.npmjs.com/package/jsdom", class: "w3-hover-opacity"},
                "jsdom",
              ),
            ),
            ".",
          ),
          p(
            "Note that, ",
            code({class: "symbol"},
              "mini-van",
            ),
            " mode doesn't work in Bun yet due to the integration issue with ",
            code({class: "symbol"},
              "jsdom",
            ),
            ".",
          ),
          p(
            "First, install ",
            code({class: "symbol"},
              "jsdom",
            ),
            ":",
          ),
          pre(
            code({class: "language-shell"},
              "npm install jsdom",
            ),
          ),
          p(
            "Sample code:",
          ),
          pre(
            code({class: "language-js"},
              "import http from \"node:http\"\nimport jsdom from \"jsdom\"\nimport van from \"mini-van-plate\"\n\nconst dom = new jsdom.JSDOM(\"\")\nconst {html, tags: {a, body, button, input, li, p, ul}} = van.vanWithDoc(dom.window.document)\n\nconst port = 8080\n\nconsole.log(\"Testing DOM rendering...\")\n// Expecting `<a href=\"https://vanjs.org/\">🍦VanJS</a>` printed in the console\nconsole.log(a({href: \"https://vanjs.org/\"}, \"🍦VanJS\").outerHTML)\n// Expecting `<button onclick=\"alert(&quot;Hello&quot;)\">Click</button>` printed in the console\nconsole.log(button({onclick: 'alert(\"Hello\")'}, \"Click\").outerHTML)\n// Expecting `<input type=\"text\" value=\"value\">` printed in the console\nconsole.log(input({type: \"text\", value: \"value\"}).outerHTML)\n\nconst server = http.createServer((req, res) => {\n  res.statusCode = 200\n  res.setHeader('Content-Type', 'text/html; charset=utf-8')\n  res.end(html(\n    body(\n      p(\"Your user-agent is: \", req.headers[\"user-agent\"] ?? \"Unknown\"),\n      p(\"👋Hello\"),\n      ul(\n        li(\"🗺️World\"),\n        li(a({href: \"https://vanjs.org/\"}, \"🍦VanJS\")),\n      ),\n    ),\n  ))\n})\n\nserver.listen(port, () => console.log(`Server running at http://localhost:${port}/`))\n",
            ),
          ),
          p(
            "Preview via ",
            a({href: "https://codesandbox.io/p/sandbox/eloquent-nova-s9km5j?file=/mini-van-server.mjs:1,1", class: "w3-hover-opacity"},
              "CodeSandbox",
            ),
            ".",
          ),
          p(
            "Similar to ",
            code({class: "symbol"},
              "van-plate",
            ),
            " mode, we have a helper function ",
            code({class: "symbol"},
              "html",
            ),
            " defined in ",
            code({class: "symbol"},
              "mini-van.js",
            ),
            " which is equivalent to:",
          ),
          pre(
            code({class: "language-js"},
              "(...args) => \"<!DOCTYPE html>\" + tags.html(...args).outerHTML",
            ),
          ),
          h2({class: "w3-xxlarge w3-text-red", id: "server-side-deno-integration"},
            a({class: "self-link", href: "#server-side-deno-integration"},
              "Server-Side: Deno Integration",
            ),
          ),
          hr({style: "width:50px;border:5px solid red", class: "w3-round"}),
          p(
            "Similarly, ",
            b(
              "Mini-Van",
            ),
            " can work with Deno as well, in both ",
            code({class: "symbol"},
              "van-plate",
            ),
            " mode and ",
            code({class: "symbol"},
              "mini-van",
            ),
            " mode. A Deno module  was published here: ",
            code({class: "symbol"},
              a({href: "https://deno.land/x/minivan", class: "w3-hover-opacity"},
                "deno.land/x/minivan",
              ),
            ),
            ".",
          ),
          h3({class: "w3-large w3-text-red", id: "deno-van-plate"},
            a({class: "self-link", href: "#deno-van-plate"},
              code({class: "symbol"},
                "van-plate",
              ),
              " mode",
            ),
          ),
          p(
            "Sample code:",
          ),
          div({style: "font-size: 0.9em;"},
            i(
              "Requires Deno ",
              code({class: "symbol"},
                "1.35",
              ),
              " or later.",
            ),
          ),
          pre(
            code({class: "language-ts"},
              "import van from \"https://deno.land/x/minivan@0.4.2/src/van-plate.js\"\n\nconst {a, body, button, input, li, p, ul} = van.tags\n\nconst port = 8080\n\nconsole.log(\"Testing DOM rendering...\")\n// Expecting `<a href=\"https://vanjs.org/\">🍦VanJS</a>` printed in the console\nconsole.log(a({href: \"https://vanjs.org/\"}, \"🍦VanJS\").render())\n// Expecting `<button onclick=\"alert(&quot;Hello&quot;)\">Click</button>` printed in the console\nconsole.log(button({onclick: 'alert(\"Hello\")'}, \"Click\").render())\n// Expecting `<input type=\"text\" value=\"value\">` printed in the console\nconsole.log(input({type: \"text\", value: \"value\"}).render())\n\nconsole.log(`HTTP webserver running. Access it at: http://localhost:${port}/`)\nDeno.serve({port}, req => new Response(\n  van.html(\n    body(\n      p(\"Your user-agent is: \", req.headers.get(\"user-agent\") ?? \"Unknown\"),\n      p(\"👋Hello\"),\n      ul(\n        li(\"🗺️World\"),\n        li(a({href: \"https://vanjs.org/\"}, \"🍦VanJS\")),\n      ),\n    ),\n  ),\n  {\n    status: 200,\n    headers: {\"content-type\": \"text/html; charset=utf-8\"},\n  },\n))\n",
            ),
          ),
          p(
            "Preview via ",
            a({href: "https://codesandbox.io/p/sandbox/eloquent-bird-95rzff?file=/van-plate-server.ts:1,1", class: "w3-hover-opacity"},
              "CodeSandbox",
            ),
            ".",
          ),
          h3({class: "w3-large w3-text-red", id: "deno-mini-van"},
            a({class: "self-link", href: "#deno-mini-van"},
              code({class: "symbol"},
                "mini-van",
              ),
              " mode",
            ),
          ),
          p(
            "Likewise, ",
            b(
              "Mini-Van",
            ),
            " mode needs a 3rd-party DOM library to provide the ",
            code({class: "symbol"},
              "Document",
            ),
            " object. We will show an example with the integration of ",
            code({class: "symbol"},
              a({href: "https://deno.com/manual@v1.28.1/advanced/jsx_dom/deno_dom", class: "w3-hover-opacity"},
                "deno-dom",
              ),
            ),
            ".",
          ),
          div({style: "font-size: 0.9em;"},
            i(
              "Requires Deno ",
              code({class: "symbol"},
                "1.35",
              ),
              " or later.",
            ),
          ),
          pre(
            code({class: "language-ts"},
              "import { DOMParser } from \"https://deno.land/x/deno_dom@v0.1.38/deno-dom-wasm.ts\"\nimport van from \"https://deno.land/x/minivan@0.4.2/src/mini-van.js\"\n\nconst document = new DOMParser().parseFromString(\"\", \"text/html\")!\nconst {tags: {a, body, button, input, li, p, ul}, html} = van.vanWithDoc(document)\n\nconst port = 8080\n\nconsole.log(\"Testing DOM rendering...\")\n// Expecting `<a href=\"https://vanjs.org/\">🍦VanJS</a>` printed in the console\nconsole.log(a({href: \"https://vanjs.org/\"}, \"🍦VanJS\").outerHTML)\n// Expecting `<button onclick=\"alert(&quot;Hello&quot;)\">Click</button>` printed in the console\nconsole.log(button({onclick: 'alert(\"Hello\")'}, \"Click\").outerHTML)\n// Expecting `<input type=\"text\" value=\"value\">` printed in the console\nconsole.log(input({type: \"text\", value: \"value\"}).outerHTML)\n\nconsole.log(`HTTP webserver running. Access it at: http://localhost:${port}/`)\nDeno.serve({port}, req => new Response(\n  html(\n    body(\n      p(\"Your user-agent is: \", req.headers.get(\"user-agent\") ?? \"Unknown\"),\n      p(\"👋Hello\"),\n      ul(\n        li(\"🗺️World\"),\n        li(a({href: \"https://vanjs.org/\"}, \"🍦VanJS\")),\n      ),\n    ),\n  ),\n  {\n    status: 200,\n    headers: {\"content-type\": \"text/html; charset=utf-8\"},\n  },\n))\n",
            ),
          ),
          p(
            "Preview via ",
            a({href: "https://codesandbox.io/p/sandbox/heuristic-browser-vtxh3c?file=/mini-van-server.ts:1,1", class: "w3-hover-opacity"},
              "CodeSandbox",
            ),
            ".",
          ),
          h2({class: "w3-xxlarge w3-text-red", id: "client-side-getting-started"},
            a({class: "self-link", href: "#client-side-getting-started"},
              "Client-Side: Getting Started",
            ),
          ),
          hr({style: "width:50px;border:5px solid red", class: "w3-round"}),
          p(
            "To get started on the client side, add the line below to your script:",
          ),
          pre(
            code({class: "language-js"},
              "import van from \"https://cdn.jsdelivr.net/gh/vanjs-org/mini-van/public/mini-van-0.4.2.min.js\"",
            ),
          ),
          p(
            "To code without ES6 modules, add the following line to your HTML file instead:",
          ),
          pre(
            code({class: "language-html"},
              "<script type=\"text/javascript\" src=\"https://cdn.jsdelivr.net/gh/vanjs-org/mini-van/public/mini-van-0.4.2.nomodule.min.js\"></script>",
            ),
          ),
          p(
            "Alternative, you can download the files (",
            code({class: "symbol"},
              a({href: "/code/mini-van-0.4.2.min.js", download: "mini-van-0.4.2.min.js", style: "white-space: nowrap;", title: "Download mini-van-0.4.2.min.js"},
                "mini-van-0.4.2.min.js",
              ),
            ),
            ", ",
            code({class: "symbol"},
              a({href: "/code/mini-van-0.4.2.nomodule.min.js", download: "mini-van-0.4.2.nomodule.min.js", style: "white-space: nowrap;", title: "Download mini-van-0.4.2.nomodule.min.js"},
                "mini-van-0.4.2.nomodule.min.js",
              ),
            ),
            ") and serve them locally.",
          ),
          h3({class: "w3-large w3-text-red", id: "download-table"},
            a({class: "self-link", href: "#download-table"},
              "Download Table",
            ),
          ),
          p(
            "You can find all relevant ",
            b(
              "Mini-Van",
            ),
            " files to download in the table below:",
          ),
          div(
            "Click the link to download the file, or 📋 to copy the import line from CDN.",
          ),
          table({class: "download-table"},
            thead(
              tr(
                th(
                  "Files",
                ),
                th(
                  "Description",
                ),
              ),
            ),
            tbody(
              tr(
                td(
                  pre({style: "margin: 0;"},
                    code({class: "symbol"},
                      a({href: "/code/mini-van-0.4.2.min.js", download: "mini-van-0.4.2.min.js", style: "white-space: nowrap;", title: "Download mini-van-0.4.2.min.js"},
                        "mini-van-0.4.2.min.js",
                      ),
                      a({class: "copy", onclick: "copy(this)", onmouseout: "resetTooltip(this)"},
                        span({class: "tooltip"},
                          "Copy import line",
                        ),
                        "📋",
                      ),
                    ),
                  ),
                  pre({style: "margin: 0;"},
                    code({class: "symbol"},
                      a({href: "/code/mini-van-0.4.2.min.d.ts", download: "mini-van-0.4.2.min.d.ts", style: "white-space: nowrap;", title: "Download mini-van-0.4.2.min.d.ts"},
                        "mini-van-0.4.2.min.d.ts",
                      ),
                    ),
                  ),
                ),
                td(
                  "Minified script file for ES6 modules, optimized for bundle size.",
                ),
              ),
              tr(
                td(
                  pre({style: "margin: 0;"},
                    code({class: "symbol"},
                      a({href: "/code/mini-van-0.4.2.js", download: "mini-van-0.4.2.js", style: "white-space: nowrap;", title: "Download mini-van-0.4.2.js"},
                        "mini-van-0.4.2.js",
                      ),
                      a({class: "copy", onclick: "copy(this)", onmouseout: "resetTooltip(this)"},
                        span({class: "tooltip"},
                          "Copy import line",
                        ),
                        "📋",
                      ),
                    ),
                  ),
                  pre({style: "margin: 0;"},
                    code({class: "symbol"},
                      a({href: "/code/mini-van-0.4.2.d.ts", download: "mini-van-0.4.2.d.ts", style: "white-space: nowrap;", title: "Download mini-van-0.4.2.d.ts"},
                        "mini-van-0.4.2.d.ts",
                      ),
                    ),
                  ),
                ),
                td(
                  "The source file without minification.",
                ),
              ),
              tr(
                td(
                  pre({style: "margin: 0;"},
                    code({class: "symbol"},
                      a({href: "/code/van-0.4.2.nomodule.min.js", download: "van-0.4.2.nomodule.min.js", style: "white-space: nowrap;", title: "Download van-0.4.2.nomodule.min.js"},
                        "van-0.4.2.nomodule.min.js",
                      ),
                      a({class: "copy", onclick: "copy(this)", onmouseout: "resetTooltip(this)"},
                        span({class: "tooltip"},
                          "Copy import line",
                        ),
                        "📋",
                      ),
                    ),
                  ),
                ),
                td(
                  "Similar to ",
                  code({class: "symbol"},
                    "mini-van-0.4.2.min.js",
                  ),
                  ", but designed to work in non-module context, such as inline JavaScript or ",
                  code({class: "symbol"},
                    "<script type=\"text/javascript\">",
                  ),
                  ".",
                ),
              ),
              tr(
                td(
                  pre({style: "margin: 0;"},
                    code({class: "symbol"},
                      a({href: "/code/van-0.4.2.nomodule.js", download: "van-0.4.2.nomodule.js", style: "white-space: nowrap;", title: "Download van-0.4.2.nomodule.js"},
                        "van-0.4.2.nomodule.js",
                      ),
                      a({class: "copy", onclick: "copy(this)", onmouseout: "resetTooltip(this)"},
                        span({class: "tooltip"},
                          "Copy import line",
                        ),
                        "📋",
                      ),
                    ),
                  ),
                ),
                td(
                  "Similar to ",
                  code({class: "symbol"},
                    "mini-van-0.4.2.js",
                  ),
                  ", but designed to work in non-module context, such as inline JavaScript or ",
                  code({class: "symbol"},
                    "<script type=\"text/javascript\">",
                  ),
                  ".",
                ),
              ),
            ),
          ),
          h2({class: "w3-xxlarge w3-text-red", id: "api-reference"},
            a({class: "self-link", href: "#api-reference"},
              "API Reference",
            ),
          ),
          hr({style: "width:50px;border:5px solid red", class: "w3-round"}),
          p(
            b(
              "Mini-Van",
            ),
            " exposes the same set of APIs as ",
            b(
              "VanJS",
            ),
            " for DOM composition and manipulation. Thus for API reference, you can refer to ",
            a({href: "/tutorial#dom", class: "w3-hover-opacity"},
              "DOM Composition and Manipulation",
            ),
            " section of ",
            b(
              "VanJS",
            ),
            " tutorial. Note that: state and state binding are not supported in ",
            b(
              "Mini-Van",
            ),
            ".",
          ),
          h2({class: "w3-xxlarge w3-text-red", id: "source-code"},
            a({class: "self-link", href: "#source-code"},
              "Source Code",
            ),
          ),
          hr({style: "width:50px;border:5px solid red", class: "w3-round"}),
          p({style: "display: flex; align-items: center;"},
            svg({height: "16", "aria-hidden": "true", viewbox: "0 0 16 16", version: "1.1", width: "16", "data-view-component": "true", class: "octicon octicon-mark-github v-align-middle", style: "margin-right: 6px;"},
              path({"d": "M8 0c4.42 0 8 3.58 8 8a8.013 8.013 0 0 1-5.45 7.59c-.4.08-.55-.17-.55-.38 0-.27.01-1.13.01-2.2 0-.75-.25-1.23-.54-1.48 1.78-.2 3.65-.88 3.65-3.95 0-.88-.31-1.59-.82-2.15.08-.2.36-1.02-.08-2.12 0 0-.67-.22-2.2.82-.64-.18-1.32-.27-2-.27-.68 0-1.36.09-2 .27-1.53-1.03-2.2-.82-2.2-.82-.44 1.1-.16 1.92-.08 2.12-.51.56-.82 1.28-.82 2.15 0 3.06 1.86 3.75 3.64 3.95-.23.2-.44.55-.51 1.07-.46.21-1.61.55-2.33-.66-.15-.24-.6-.83-1.23-.82-.67.01-.27.38.01.53.34.19.73.9.82 1.13.16.45.68 1.31 2.69.94 0 .67.01 1.3.01 1.49 0 .21-.15.45-.55.38A7.995 7.995 0 0 1 0 8c0-4.42 3.58-8 8-8Z"}),
            ),
            a({href: "https://github.com/vanjs-org/mini-van", class: "w3-hover-opacity"},
              "github.com/vanjs-org/mini-van",
            ),
          ),
          h2({class: "w3-xxlarge w3-text-red", id: "support-feedback"},
            a({class: "self-link", href: "#support-feedback"},
              "Support & Feedback",
            ),
          ),
          hr({style: "width:50px;border:5px solid red", class: "w3-round"}),
          p(
            "🙏 ",
            b(
              "VanJS",
            ),
            " aims to build a better world by reducing the entry barrier for UI programming, with no intention or plan on commercialization whatsoever. If you find ",
            b(
              "VanJS",
            ),
            " interesting, or could be useful for you some day, please consider starring the project on ",
            a({href: "https://github.com/vanjs-org/mini-van", class: "w3-hover-opacity"},
              "GitHub",
            ),
            ". It takes just a few seconds but your support means the world to us and helps spread ",
            b(
              "VanJS",
            ),
            " to a wider audience.",
          ),
          p(
            "We're looking for the 1.0 milestone (commitment to API stability) soon, your precious feedback will be greatly appreciated. You can submit your feedback by creating issues with the link below:",
          ),
          p(
            a({class: "github-button", href: "https://github.com/vanjs-org/mini-van", "data-icon": "octicon-star", "data-show-count": "true", "aria-label": "Star vanjs-org/van on GitHub"},
              "Star",
            ),
            a({class: "github-button", href: "https://github.com/vanjs-org/mini-van/subscription", "data-icon": "octicon-eye", "aria-label": "Watch vanjs-org/van on GitHub"},
              "Watch",
            ),
            a({class: "github-button", href: "https://github.com/vanjs-org/mini-van/issues", "data-icon": "octicon-issue-opened", "aria-label": "Issue vanjs-org/van on GitHub"},
              "Issue",
            ),
            a({class: "github-button", href: "https://github.com/vanjs-org", "aria-label": "Follow @vanjs-org on GitHub"},
              "Follow @vanjs-org",
            ),
          ),
          p(
            "Contact us: ",
            a({href: "mailto:tao@vanjs.org", class: "w3-hover-opacity"},
              "tao@vanjs.org",
            ),
          ),
        ),
        aside({id: "toc"},
          ul(
            li(
              a({href: "#server-side-npm-integration", class: "w3-hover-opacity"},
                "Server-Side: NPM Integration",
              ),
              ul(
                li(
                  a({href: "#install", class: "w3-hover-opacity"},
                    "Install",
                  ),
                ),
                li(
                  a({href: "#npm-van-plate", class: "w3-hover-opacity"},
                    "van-plate mode",
                  ),
                ),
                li(
                  a({href: "#npm-mini-van", class: "w3-hover-opacity"},
                    "mini-van mode",
                  ),
                ),
              ),
            ),
            li(
              a({href: "#server-side-deno-integration", class: "w3-hover-opacity"},
                "Server-Side: Deno Integration",
              ),
              ul(
                li(
                  a({href: "#deno-van-plate", class: "w3-hover-opacity"},
                    "van-plate mode",
                  ),
                ),
                li(
                  a({href: "#deno-mini-van", class: "w3-hover-opacity"},
                    "mini-van mode",
                  ),
                ),
              ),
            ),
            li(
              a({href: "#client-side-getting-started", class: "w3-hover-opacity"},
                "Client-Side: Getting Started",
              ),
              ul(
                li(
                  a({href: "#download-table", class: "w3-hover-opacity"},
                    "Download Table",
                  ),
                ),
              ),
            ),
            li(
              a({href: "#api-reference", class: "w3-hover-opacity"},
                "API Reference",
              ),
            ),
            li(
              a({href: "#source-code", class: "w3-hover-opacity"},
                "Source Code",
              ),
            ),
            li(
              a({href: "#support-feedback", class: "w3-hover-opacity"},
                "Support & Feedback",
              ),
            ),
          ),
        ),
      ),
    ),
    script({type: "text/javascript", src: "/prism.js"}),
    script({type: "module"}),
    script({type: "text/javascript", src: "https://www.gstatic.com/charts/loader.js"}),
    script({type: "text/javascript", src: "/code/diff.min.js"}),
    script({type: "text/javascript", src: "/code/van-latest.nomodule.min.js"}),
    script({type: "text/javascript", src: "/page-script.js"}),
    script({class: "inline"}),
    script({async: "", defer: "", src: "https://buttons.github.io/buttons.js"}),
  ),
)