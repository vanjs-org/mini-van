import http from "node:http"
import van from "mini-van-plate/van-plate"

const {html, tags: {body, h1, p}} = van

http.createServer((req, res) => {
  res.statusCode = 200
  res.setHeader('Content-Type', 'text/html; charset=utf-8')
  res.setHeader("Cache-Control", "no-transform"); // set to match the Deno benchmark, which requires this for an apples to apples comparison
  res.end(html(
    body(
      h1("Hello World"),
      p("This is an example."),
    ),
  ))
}).listen(8080)
