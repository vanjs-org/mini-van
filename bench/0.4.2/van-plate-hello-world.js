// to run this:
//  NODE_ENV=production bun van-plate-hello-world.js

import van from "mini-van-plate/van-plate";

const {html, tags: {body, h1, p}} = van

const headers = {
  headers: {
    "Content-Type": "text/html",
  },
};

const port = Number(process.env.PORT || 8080);
Bun.serve({
  port,
  async fetch(req) {
    return new Response(html(
      body(
        h1("Hello World"),
        p("This is an example."),
      ),
    ), headers);
  },
});

console.log(`Server running on\n  http://localhost:${port}`);