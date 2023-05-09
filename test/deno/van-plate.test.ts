import { assertEquals } from "https://deno.land/std@0.184.0/testing/asserts.ts";
import van from "../../src/van-plate.js"

const {a, body, br, div, head, input, hr, li, p, title, ul} = van.tags

Deno.test("tags", () => {
  assertEquals(div(
    p("👋Hello"),
    ul(
      li("🗺️World"),
      li(a({href: "https://vanjs.org/"}, "🍦VanJS")),
    ),
  ).render(), '<div><p>👋Hello</p><ul><li>🗺️World</li><li><a href="https://vanjs.org/">🍦VanJS</a></li></ul></div>')
})

Deno.test("elements without child", () => {
  assertEquals(br().render(), "<br>")
  assertEquals(hr({class: "large"}).render(), '<hr class="large">')
  // Children are ignored even when they are provided
  assertEquals(br(div("Line")).render(), "<br>")
})

Deno.test("boolean prop", () => {
  assertEquals(input({type: "checkbox", checked: false}).render(), '<input type="checkbox">')
  assertEquals(input({type: "checkbox", checked: true}).render(), '<input type="checkbox" checked>')
  assertEquals(input({checked: false}).render(), '<input>')
  assertEquals(input({checked: true}).render(), '<input checked>')
})

Deno.test("escape", () => {
  assertEquals(p("<input>").render(), "<p>&lt;input&gt;</p>")
  assertEquals(div("a && b").render(), "<div>a &amp;&amp; b</div>")
  assertEquals(div("<input a && b>").render(), "<div>&lt;input a &amp;&amp; b&gt;</div>")
})

Deno.test("nested children", () => {
  assertEquals(ul([li("Item 1"), li("Item 2"), li("Item 3")]).render(),
    "<ul><li>Item 1</li><li>Item 2</li><li>Item 3</li></ul>")
  // Deeply nested
  assertEquals(ul([[li("Item 1"), [li("Item 2")]], li("Item 3")]).render(),
    "<ul><li>Item 1</li><li>Item 2</li><li>Item 3</li></ul>")
})

Deno.test("add basic", () => {
  const dom = ul()
  assertEquals(van.add(dom, li("Item 1"), li("Item 2")), dom)
  assertEquals(dom.render(), "<ul><li>Item 1</li><li>Item 2</li></ul>")
  assertEquals(van.add(dom, li("Item 3"), li("Item 4"), li("Item 5")), dom)
  assertEquals(dom.render(), "<ul><li>Item 1</li><li>Item 2</li><li>Item 3</li><li>Item 4</li><li>Item 5</li></ul>")
  // No-op if no children specified
  assertEquals(van.add(dom), dom)
  assertEquals(dom.render(), "<ul><li>Item 1</li><li>Item 2</li><li>Item 3</li><li>Item 4</li><li>Item 5</li></ul>")
})

Deno.test("add nested children", () => {
  const dom = ul()
  assertEquals(van.add(dom, [li("Item 1"), li("Item 2")]), dom)
  assertEquals(dom.render(), "<ul><li>Item 1</li><li>Item 2</li></ul>")
  // Deeply nested
  assertEquals(van.add(dom, [[li("Item 3"), [li("Item 4")]], li("Item 5")]), dom)
  assertEquals(dom.render(), "<ul><li>Item 1</li><li>Item 2</li><li>Item 3</li><li>Item 4</li><li>Item 5</li></ul>")
  // No-op if no children specified
  assertEquals(van.add(dom, [[[]]]), dom)
  assertEquals(dom.render(), "<ul><li>Item 1</li><li>Item 2</li><li>Item 3</li><li>Item 4</li><li>Item 5</li></ul>")
})

Deno.test("html", () => {
  assertEquals(van.html(
    head(title("Hello")),
    body(div("World")),
  ), "<!DOCTYPE html><html><head><title>Hello</title></head><body><div>World</div></body></html>")
  assertEquals(van.html({lang: "en"},
    head(title("Hello")),
    body(div("World")),
  ), '<!DOCTYPE html><html lang="en"><head><title>Hello</title></head><body><div>World</div></body></html>')
})
