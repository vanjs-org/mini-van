import page from "./page.js"

const htmlHeaders = {headers: {"Content-Type": "text/html; charset=UTF-8"}}
const svgHeaders = {headers: {"Content-Type": "image/svg+xml"}}

Deno.serve({port: Number(Deno.args[0] ?? "8080")}, async req => {
  const url = new URL(req.url)
  if (url.pathname !== "/") return new Response(
    (await Deno.open(url.pathname.slice(1), {read: true})).readable,
    url.pathname.endsWith(".svg") ? svgHeaders : {}
  )
  return new Response(page(), htmlHeaders)
})
