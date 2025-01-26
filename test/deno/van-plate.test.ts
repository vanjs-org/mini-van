import { assertEquals } from "https://deno.land/std@0.184.0/testing/asserts.ts";
import van from "../../src/van-plate.js"

const {a, body, br, button, div, head, hr, input, li, p, pre, script, span, style, title, ul} = van.tags

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

Deno.test("escapeAttr", () => {
  assertEquals(input({value: '"text"'}).render(), '<input value="&quot;text&quot;">')
})

Deno.test("don't escape script tag", () => {
  assertEquals(script("console.log(a < b && c > d)").render(), "<script>console.log(a < b && c > d)</script>")
})

Deno.test("don't escape style tag", () => {
  assertEquals(style("ul > li { list-style-type: square; }").render(), "<style>ul > li { list-style-type: square; }</style>")
})

Deno.test("nested children", () => {
  assertEquals(ul([li("Item 1"), li("Item 2"), li("Item 3")]).render(),
    "<ul><li>Item 1</li><li>Item 2</li><li>Item 3</li></ul>")
  // Deeply nested
  assertEquals(ul([[li("Item 1"), [li("Item 2")]], li("Item 3")]).render(),
    "<ul><li>Item 1</li><li>Item 2</li><li>Item 3</li></ul>")
})

Deno.test("null or undefined are ignored", () => {
  assertEquals(ul(li("Item 1"), li("Item 2"), undefined, li("Item 3"), null).render(),
    "<ul><li>Item 1</li><li>Item 2</li><li>Item 3</li></ul>")
  assertEquals(ul([li("Item 1"), li("Item 2"), undefined, li("Item 3"), null]).render(),
    "<ul><li>Item 1</li><li>Item 2</li><li>Item 3</li></ul>")
  // Deeply nested
  assertEquals(ul([[undefined, li("Item 1"), null, [li("Item 2")]], null, li("Item 3"), undefined]).render(),
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

Deno.test("add: null or undefined are ignored", () => {
  const dom = ul()
  assertEquals(van.add(dom, li("Item 1"), li("Item 2"), undefined, li("Item 3"), null), dom)
  assertEquals(dom.render(), "<ul><li>Item 1</li><li>Item 2</li><li>Item 3</li></ul>")
  assertEquals(van.add(dom, [li("Item 4"), li("Item 5"), undefined, li("Item 6"), null]), dom)
  assertEquals(dom.render(),
    "<ul><li>Item 1</li><li>Item 2</li><li>Item 3</li><li>Item 4</li><li>Item 5</li><li>Item 6</li></ul>")
  // Deeply nested
  assertEquals(van.add(dom, [[undefined, li("Item 7"), null, [li("Item 8")]], null, li("Item 9"), undefined]), dom)
  assertEquals(dom.render(),
    "<ul><li>Item 1</li><li>Item 2</li><li>Item 3</li><li>Item 4</li><li>Item 5</li><li>Item 6</li><li>Item 7</li><li>Item 8</li><li>Item 9</li></ul>")
  // No-op if no non-empty children specified
  assertEquals(van.add(dom, [[null, [undefined]], undefined], null), dom)
  assertEquals(dom.render(),
    "<ul><li>Item 1</li><li>Item 2</li><li>Item 3</li><li>Item 4</li><li>Item 5</li><li>Item 6</li><li>Item 7</li><li>Item 8</li><li>Item 9</li></ul>")
})

Deno.test("onclick handler", () => {
  {
    const dom = div(button({onclick: 'alert("Hello")'}, "Click me"))
    assertEquals(dom.render(), '<div><button onclick="alert(&quot;Hello&quot;)">Click me</button></div>')
  }

  {
    // Function-valued onclick handler will be skipped
    const dom = div(button({onclick: () => alert("Hello")}, "Click me"))
    assertEquals(dom.render(), '<div><button>Click me</button></div>')
  }
})

Deno.test("tags: svg", () => {
  const {circle, path, svg} = van.tags("http://www.w3.org/2000/svg")
  const dom = svg({width: "16px", viewBox: "0 0 50 50"},
    circle({cx: "25", cy: "25", "r": "20", stroke: "black", "stroke-width": "2", fill: "yellow"}),
    circle({cx: "16", cy: "20", "r": "2", stroke: "black", "stroke-width": "2", fill: "black"}),
    circle({cx: "34", cy: "20", "r": "2", stroke: "black", "stroke-width": "2", fill: "black"}),
    path({"d": "M 15 30 Q 25 40, 35 30", stroke: "black", "stroke-width": "2", fill: "transparent"}),
  )
  assertEquals(dom.render(), '<svg width="16px" viewBox="0 0 50 50"><circle cx="25" cy="25" r="20" stroke="black" stroke-width="2" fill="yellow"></circle><circle cx="16" cy="20" r="2" stroke="black" stroke-width="2" fill="black"></circle><circle cx="34" cy="20" r="2" stroke="black" stroke-width="2" fill="black"></circle><path d="M 15 30 Q 25 40, 35 30" stroke="black" stroke-width="2" fill="transparent"></path></svg>')
})

Deno.test("tags: math", () => {
  const {math, mi, mn, mo, mrow, msup} = van.tags("http://www.w3.org/1998/Math/MathML")
  const dom = math(msup(mi("e"), mrow(mi("i"), mi("π"))), mo("+"), mn("1"), mo("="), mn("0"))
  assertEquals(dom.render(), '<math><msup><mi>e</mi><mrow><mi>i</mi><mi>π</mi></mrow></msup><mo>+</mo><mn>1</mn><mo>=</mo><mn>0</mn></math>')
})

Deno.test("dummy reactive", () => {
  const state1 = van.state(1), state2 = van.derive(() => state1.val * 2)
  const state3 = van.state("abc"), state4 = van.derive(() => state3.val.repeat(2))
  const state5 = van.state(false), state6 = van.derive(() => !state5.val)

      const dom = div(
        state1, span(state2), p(() => `Prefix - ${state3.val}`), () => `${state4.oldVal} - Suffix`,
        p({
          "data-index": state1,
          "data-id": () => state2.val + 2,
          "data-title": state3,
          "data-text": () => `Prefix - ${state4.rawVal} - Suffix`,
        }, () => state1.val, () => state2.oldVal, state3, () => state4.val),
        button({onclick: van.derive(() => state5.val ? 'console.log("Hello")' : 'alert("Hello")')},
          "Button1"
        ),
        button({onclick: van.derive(
          () => state6.val ? () => console.log("Hello") : () => alert("Hello"))},
          "Button2"
        ),
        () => (state5.val ? pre : div)(state3),
        () => (state6.rawVal ? pre : div)(state4),
      )
  assertEquals(dom.render(), '<div>1<span>2</span><p>Prefix - abc</p>abcabc - Suffix<p data-index="1" data-id="4" data-title="abc" data-text="Prefix - abcabc - Suffix">12abcabcabc</p><button onclick="alert(&quot;Hello&quot;)">Button1</button><button>Button2</button><div>abc</div><pre>abcabc</pre></div>')
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

// Test cases for examples used in the documentation. Having the tests to ensure the examples
// are always correct.
Deno.test("example: van-plate-server", () => {
  assertEquals(a({href: "https://vanjs.org/"}, "🍦VanJS").render(), `<a href="https://vanjs.org/">🍦VanJS</a>`)
  assertEquals(button({onclick: 'alert("Hello")'}, "Click").render(), `<button onclick="alert(&quot;Hello&quot;)">Click</button>`)
  assertEquals(input({type: "text", value: "value"}).render(), `<input type="text" value="value">`)
})
