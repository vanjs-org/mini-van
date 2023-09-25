import page from "./page.js"

const headers = {headers: {"Content-Type": "text/html; charset=UTF-8"}}

Bun.serve({
  port: Bun.argv[2] ?? "8080",
  fetch(req) {
    const url = new URL(req.url)
    if (url.pathname !== "/") return new Response(Bun.file("." + url.pathname))
    return new Response(page(), headers)
  }
})
