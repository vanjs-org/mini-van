import { renderToReadableStream } from "react-dom/server";
import * as React from "react"

const App = () => (
  <html>
    <body>
      <h1>Hello World</h1>
      <p>This is an example.</p>
    </body>
  </html>
);

const headers = {
  headers: {
    "Content-Type": "text/html",
    "Cache-Control": "no-transform", // disables response body auto compression, see https://deno.land/manual/runtime/http_server_apis#automatic-body-compression
  },
};

Deno.serve(
  { port: 8080 },
  async req => {
    return new Response(await renderToReadableStream(<App />), headers);
  },
);