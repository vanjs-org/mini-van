import type {Van} from "../src/mini-van.d.ts"

(<any>window).numTests = 0

const runTests = (van: Van, msgDom: Element) => {
  const {a, body, button, div, head, input, li, p, pre, span, title, ul} = van.tags

  const assertEq = (lhs: string | Element, rhs: string | Element) => {
    if (lhs !== rhs) throw new Error(`Assertion failed. Expected equal. Actual lhs: ${lhs}, rhs: ${rhs}`)
  }

  const tests = {
    tags_basic: () => {
      const dom = div(
        p("👋Hello"),
        ul(
          li("🗺️World"),
          li(a({href: "https://vanjs.org/"}, "🍦VanJS")),
        ),
      )

      assertEq(dom.outerHTML, '<div><p>👋Hello</p><ul><li>🗺️World</li><li><a href="https://vanjs.org/">🍦VanJS</a></li></ul></div>')
    },

    tags_onclickHandler: () => {
      {
        const dom = div(button({onclick: 'alert("Hello")'}, "Click me"))
        assertEq(dom.outerHTML, '<div><button onclick="alert(&quot;Hello&quot;)">Click me</button></div>')
      }

      {
        const dom = div(button({onClick: 'alert("Hello")'}, "Click me"))
        assertEq(dom.outerHTML, '<div><button onclick="alert(&quot;Hello&quot;)">Click me</button></div>')
      }

      {
        // Function-valued onclick handler will be skipped
        const dom = div(button({onclick: () => alert("Hello")}, "Click me"))
        assertEq(dom.outerHTML, '<div><button>Click me</button></div>')
      }
    },

    tags_escape: () => {
      assertEq(p("<input>").outerHTML, "<p>&lt;input&gt;</p>")
      assertEq(div("a && b").outerHTML, "<div>a &amp;&amp; b</div>")
      assertEq(div("<input a && b>").outerHTML, "<div>&lt;input a &amp;&amp; b&gt;</div>")
    },

    tags_nestedChildren: () => {
      assertEq(ul([li("Item 1"), li("Item 2"), li("Item 3")]).outerHTML,
        "<ul><li>Item 1</li><li>Item 2</li><li>Item 3</li></ul>")
      // Deeply nested
      assertEq(ul([[li("Item 1"), [li("Item 2")]], li("Item 3")]).outerHTML,
        "<ul><li>Item 1</li><li>Item 2</li><li>Item 3</li></ul>")
    },

    tags_nullOrUndefinedAreIgnored: () => {
      assertEq(ul(li("Item 1"), li("Item 2"), undefined, li("Item 3"), null).outerHTML,
      "<ul><li>Item 1</li><li>Item 2</li><li>Item 3</li></ul>")
      assertEq(ul([li("Item 1"), li("Item 2"), undefined, li("Item 3"), null]).outerHTML,
        "<ul><li>Item 1</li><li>Item 2</li><li>Item 3</li></ul>")
      // Deeply nested
      assertEq(ul([[undefined, li("Item 1"), null, [li("Item 2")]], null, li("Item 3"), undefined]).outerHTML,
        "<ul><li>Item 1</li><li>Item 2</li><li>Item 3</li></ul>")
    },

    tags_readonlyProps: () => {
      assertEq(input({list: "datalist1"}).outerHTML, '<input list="datalist1">')
    },

    add_basic: () => {
      const dom = ul()
      assertEq(van.add(dom, li("Item 1"), li("Item 2")), dom)
      assertEq(dom.outerHTML, "<ul><li>Item 1</li><li>Item 2</li></ul>")
      van.add(dom, li("Item 3"), li("Item 4"), li("Item 5"))
      assertEq(dom.outerHTML, "<ul><li>Item 1</li><li>Item 2</li><li>Item 3</li><li>Item 4</li><li>Item 5</li></ul>")
      // No-op if no children specified
      assertEq(van.add(dom), dom)
      assertEq(dom.outerHTML, "<ul><li>Item 1</li><li>Item 2</li><li>Item 3</li><li>Item 4</li><li>Item 5</li></ul>")
    },

    add_nestedChildren: () => {
      const dom = ul()
      assertEq(van.add(dom, [li("Item 1"), li("Item 2")]), dom)
      assertEq(dom.outerHTML, "<ul><li>Item 1</li><li>Item 2</li></ul>")
      // Deeply nested
      assertEq(van.add(dom, [[li("Item 3"), [li("Item 4")]], li("Item 5")]), dom)
      assertEq(dom.outerHTML, "<ul><li>Item 1</li><li>Item 2</li><li>Item 3</li><li>Item 4</li><li>Item 5</li></ul>")
      // No-op if no children specified
      assertEq(van.add(dom, [[[]]]), dom)
      assertEq(dom.outerHTML, "<ul><li>Item 1</li><li>Item 2</li><li>Item 3</li><li>Item 4</li><li>Item 5</li></ul>")
    },

    add_nullOrUndefinedAreIgnored: () => {
      const dom = ul()
      assertEq(van.add(dom, li("Item 1"), li("Item 2"), undefined, li("Item 3"), null), dom)
      assertEq(dom.outerHTML, "<ul><li>Item 1</li><li>Item 2</li><li>Item 3</li></ul>")
      assertEq(van.add(dom, [li("Item 4"), li("Item 5"), undefined, li("Item 6"), null]), dom)
      assertEq(dom.outerHTML,
        "<ul><li>Item 1</li><li>Item 2</li><li>Item 3</li><li>Item 4</li><li>Item 5</li><li>Item 6</li></ul>")
      // Deeply nested
      assertEq(van.add(dom, [[undefined, li("Item 7"), null, [li("Item 8")]], null, li("Item 9"), undefined]), dom)
      assertEq(dom.outerHTML,
        "<ul><li>Item 1</li><li>Item 2</li><li>Item 3</li><li>Item 4</li><li>Item 5</li><li>Item 6</li><li>Item 7</li><li>Item 8</li><li>Item 9</li></ul>")
    },

    tagsNS_svg: () => {
      const {circle, path, svg} = van.tags("http://www.w3.org/2000/svg")
      const dom = svg({width: "16px", viewBox: "0 0 50 50"},
        circle({cx: "25", cy: "25", "r": "20", stroke: "black", "stroke-width": "2", fill: "yellow"}),
        circle({cx: "16", cy: "20", "r": "2", stroke: "black", "stroke-width": "2", fill: "black"}),
        circle({cx: "34", cy: "20", "r": "2", stroke: "black", "stroke-width": "2", fill: "black"}),
        path({"d": "M 15 30 Q 25 40, 35 30", stroke: "black", "stroke-width": "2", fill: "transparent"}),
      )
      assertEq(dom.outerHTML, '<svg width="16px" viewBox="0 0 50 50"><circle cx="25" cy="25" r="20" stroke="black" stroke-width="2" fill="yellow"></circle><circle cx="16" cy="20" r="2" stroke="black" stroke-width="2" fill="black"></circle><circle cx="34" cy="20" r="2" stroke="black" stroke-width="2" fill="black"></circle><path d="M 15 30 Q 25 40, 35 30" stroke="black" stroke-width="2" fill="transparent"></path></svg>')
    },

    tagsNS_math: () => {
      const {math, mi, mn, mo, mrow, msup} = van.tags("http://www.w3.org/1998/Math/MathML")
      const dom = math(msup(mi("e"), mrow(mi("i"), mi("π"))), mo("+"), mn("1"), mo("="), mn("0"))
      assertEq(dom.outerHTML, '<math><msup><mi>e</mi><mrow><mi>i</mi><mi>π</mi></mrow></msup><mo>+</mo><mn>1</mn><mo>=</mo><mn>0</mn></math>')
    },

    // Validates the dummy behavior of reactive APIs works in Mini-Van
    dummyReactive: () => {
      const state1 = van.state(1), state2 = van.derive(() => state1.val * 2)
      const state3 = van.state("abc"), state4 = van.derive(() => state3.val.repeat(2))
      const state5 = van.state(false), state6 = van.derive(() => !state5.val)

      const dom = div(
        state1, span(state2), p(() => `Prefix - ${state3.val}`), () => `${state4.oldVal} - Suffix`,
        p({
          "data-index": state1,
          "data-id": () => state2.val + 2,
          "data-title": state3,
          "data-text": () => `Prefix - ${state4.oldVal} - Suffix`,
        }, () => state1.val, () => state2.oldVal, state3, () => state4.val),
        button({onclick: van.derive(() => state5.val ? 'console.log("Hello")' : 'alert("Hello")')},
          "Button1"
        ),
        button({onclick: van.derive(
          () => state6.val ? () => console.log("Hello") : () => alert("Hello"))},
          "Button2"
        ),
        () => (state5.val ? pre : div)(state3),
        () => (state6.oldVal ? pre : div)(state4),
      )
      assertEq(dom.outerHTML, '<div>1<span>2</span><p>Prefix - abc</p>abcabc - Suffix<p data-index="1" data-id="4" data-title="abc" data-text="Prefix - abcabc - Suffix">12abcabcabc</p><button onclick="alert(&quot;Hello&quot;)">Button1</button><button>Button2</button><div>abc</div><pre>abcabc</pre></div>')
    },

    fragment: () => {
      const fragment = new DocumentFragment
      fragment.append(div(1), div(2))
      const dom = div(div(0), fragment)
      assertEq(dom.outerHTML, "<div><div>0</div><div>1</div><div>2</div></div>")
    },

    html: () => {
      assertEq(van.html(
        head(title("Hello")),
        body(div("World")),
      ), "<!DOCTYPE html><html><head><title>Hello</title></head><body><div>World</div></body></html>")
      assertEq(van.html({lang: "en"},
        head(title("Hello")),
        body(div("World")),
      ), '<!DOCTYPE html><html lang="en"><head><title>Hello</title></head><body><div>World</div></body></html>')
    },
  }

  // Test cases for examples used in the documentation. Having the tests to ensure the examples
  // are always correct.
  const examples = {
    miniVanServer: () => {
      assertEq(a({href: "https://vanjs.org/"}, "🍦VanJS").outerHTML, `<a href="https://vanjs.org/">🍦VanJS</a>`)
      assertEq(button({onclick: 'alert("Hello")'}, "Click").outerHTML, `<button onclick="alert(&quot;Hello&quot;)">Click</button>`)
      assertEq(input({type: "text", value: "value"}).outerHTML, `<input type="text" value="value">`)
    }
  }

  const suites = {tests, examples}

  for (const [k, v] of Object.entries(suites)) {
    for (const [name, func] of Object.entries(v)) {
      ++(<any>window).numTests
      const resultPre = pre()
      const msgPre = pre()
      const buttonDom = button("Rerun this test")
      buttonDom.onclick = () => {
        try {
          func()
          resultPre.innerText = "✅"
          msgPre.innerText = "Rerun succeeded!"
        } catch (e) {
          resultPre.innerText = "❌"
          msgPre.innerText = "Rerun failed!"
          throw e
        }
      }

      van.add(msgDom, div(
        pre(`Running ${k}.${name}...`), resultPre, pre(" "), buttonDom, pre(" "), msgPre,
      ))

      try {
        func()
        resultPre.innerText = "✅"
      } catch (e) {
        resultPre.innerText = "❌"
        van.add(msgDom, div({style: "color: red"},
          "Test failed, please check console for error message."
        ))
        throw e
      }
    }
  }
}

export const testVanFile = async (path: string, type: string) => {
  const van = await (type === "es6" ? import(path).then(r => r.default) : fetch(path).then(r => r.text()).then(t => (eval(t), (<any>window).van)))
  const {div, h2} = van.tags
  const msgDom = div({class: "testMsg"})
  van.add(document.getElementById("msgPanel"), h2(`Running tests for ${path}`), msgDom)
  runTests(van, msgDom)
}
