import { createServer } from "node:http"
import { parse } from "node:url"
import serveStatic from "serve-static"
import finalhandler from "finalhandler"
import page from "./page.js"

const serveFile = serveStatic(".")

createServer((req, res) => {
  if (parse(req.url).pathname !== "/") return serveFile(req, res, finalhandler(req, res))
  res.statusCode = 200
  res.setHeader('Content-Type', 'text/html; charset=utf-8')
  res.end(page())
}).listen(Number(process.argv[2] ?? "8080"))
