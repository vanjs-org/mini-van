import { renderToPipeableStream } from "react-dom/server.node";
import React from "react";
import http from "node:http";
var App = function App() {
  return /*#__PURE__*/React.createElement("html", null, /*#__PURE__*/React.createElement("body", null, /*#__PURE__*/React.createElement("h1", null, "Hello World"), /*#__PURE__*/React.createElement("p", null, "This is an example.")));
};
var didError = false;
http.createServer(function (req, res) {
  var stream = renderToPipeableStream( /*#__PURE__*/React.createElement(App, null), {
    onShellReady: function onShellReady() {
      // The content above all Suspense boundaries is ready.
      // If something errored before we started streaming, we set the error code appropriately.
      res.statusCode = didError ? 500 : 200;
      res.setHeader("Content-type", "text/html");
      res.setHeader("Cache-Control", "no-transform"); // set to match the Deno benchmark, which requires this for an apples to apples comparison
      stream.pipe(res);
    },
    onShellError: function onShellError(error) {
      // Something errored before we could complete the shell so we emit an alternative shell.
      res.statusCode = 500;
      res.send('<!doctype html><p>Loading...</p><script src="clientrender.js"></script>');
    },
    onAllReady: function onAllReady() {
      // If you don't want streaming, use this instead of onShellReady.
      // This will fire after the entire page content is ready.
      // You can use this for crawlers or static generation.
      // res.statusCode = didError ? 500 : 200;
      // res.setHeader('Content-type', 'text/html');
      // stream.pipe(res);
    },
    onError: function onError(err) {
      didError = true;
      console.error(err);
    }
  });
}).listen(8080);
