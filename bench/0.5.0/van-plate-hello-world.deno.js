import van from "mini-van-plate/van-plate"

const {html, tags: {body, h1, p}} = van

const headers = {
  headers: {
    "Content-Type": "text/html",
    "Cache-Control": "no-transform", // disables response body auto compression, see https://deno.land/manual/runtime/http_server_apis#automatic-body-compression
  },
};

Deno.serve(
  { port: 8080 },
  async req => {
    return new Response(html(
      body(
        h1("Hello World"),
        p("This is an example."),
      ),
    ), headers);
  },
);