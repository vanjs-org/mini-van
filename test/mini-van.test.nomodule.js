(() => {
  // ../test/mini-van.test.js
  window.numTests = 0;
  var runTests = (van2, msgDom2) => {
    const { a, body, button, div: div2, head, input, li, p, pre, span, title, ul } = van2.tags;
    const assertEq = (lhs, rhs) => {
      if (lhs !== rhs)
        throw new Error(`Assertion failed. Expected equal. Actual lhs: ${lhs}, rhs: ${rhs}`);
    };
    const tests = {
      tags_basic: () => {
        const dom = div2(p("\u{1F44B}Hello"), ul(li("\u{1F5FA}\uFE0FWorld"), li(a({ href: "https://vanjs.org/" }, "\u{1F366}VanJS"))));
        assertEq(dom.outerHTML, '<div><p>\u{1F44B}Hello</p><ul><li>\u{1F5FA}\uFE0FWorld</li><li><a href="https://vanjs.org/">\u{1F366}VanJS</a></li></ul></div>');
      },
      tags_onclickHandler: () => {
        {
          const dom = div2(button({ onclick: 'alert("Hello")' }, "Click me"));
          assertEq(dom.outerHTML, '<div><button onclick="alert(&quot;Hello&quot;)">Click me</button></div>');
        }
        {
          const dom = div2(button({ onClick: 'alert("Hello")' }, "Click me"));
          assertEq(dom.outerHTML, '<div><button onclick="alert(&quot;Hello&quot;)">Click me</button></div>');
        }
        {
          const dom = div2(button({ onclick: () => alert("Hello") }, "Click me"));
          assertEq(dom.outerHTML, "<div><button>Click me</button></div>");
        }
      },
      tags_escape: () => {
        assertEq(p("<input>").outerHTML, "<p>&lt;input&gt;</p>");
        assertEq(div2("a && b").outerHTML, "<div>a &amp;&amp; b</div>");
        assertEq(div2("<input a && b>").outerHTML, "<div>&lt;input a &amp;&amp; b&gt;</div>");
      },
      tags_nestedChildren: () => {
        assertEq(ul([li("Item 1"), li("Item 2"), li("Item 3")]).outerHTML, "<ul><li>Item 1</li><li>Item 2</li><li>Item 3</li></ul>");
        assertEq(ul([[li("Item 1"), [li("Item 2")]], li("Item 3")]).outerHTML, "<ul><li>Item 1</li><li>Item 2</li><li>Item 3</li></ul>");
      },
      tags_nullOrUndefinedAreIgnored: () => {
        assertEq(ul(li("Item 1"), li("Item 2"), void 0, li("Item 3"), null).outerHTML, "<ul><li>Item 1</li><li>Item 2</li><li>Item 3</li></ul>");
        assertEq(ul([li("Item 1"), li("Item 2"), void 0, li("Item 3"), null]).outerHTML, "<ul><li>Item 1</li><li>Item 2</li><li>Item 3</li></ul>");
        assertEq(ul([[void 0, li("Item 1"), null, [li("Item 2")]], null, li("Item 3"), void 0]).outerHTML, "<ul><li>Item 1</li><li>Item 2</li><li>Item 3</li></ul>");
      },
      tags_readonlyProps: () => {
        assertEq(input({ list: "datalist1" }).outerHTML, '<input list="datalist1">');
      },
      add_basic: () => {
        const dom = ul();
        assertEq(van2.add(dom, li("Item 1"), li("Item 2")), dom);
        assertEq(dom.outerHTML, "<ul><li>Item 1</li><li>Item 2</li></ul>");
        van2.add(dom, li("Item 3"), li("Item 4"), li("Item 5"));
        assertEq(dom.outerHTML, "<ul><li>Item 1</li><li>Item 2</li><li>Item 3</li><li>Item 4</li><li>Item 5</li></ul>");
        assertEq(van2.add(dom), dom);
        assertEq(dom.outerHTML, "<ul><li>Item 1</li><li>Item 2</li><li>Item 3</li><li>Item 4</li><li>Item 5</li></ul>");
      },
      add_nestedChildren: () => {
        const dom = ul();
        assertEq(van2.add(dom, [li("Item 1"), li("Item 2")]), dom);
        assertEq(dom.outerHTML, "<ul><li>Item 1</li><li>Item 2</li></ul>");
        assertEq(van2.add(dom, [[li("Item 3"), [li("Item 4")]], li("Item 5")]), dom);
        assertEq(dom.outerHTML, "<ul><li>Item 1</li><li>Item 2</li><li>Item 3</li><li>Item 4</li><li>Item 5</li></ul>");
        assertEq(van2.add(dom, [[[]]]), dom);
        assertEq(dom.outerHTML, "<ul><li>Item 1</li><li>Item 2</li><li>Item 3</li><li>Item 4</li><li>Item 5</li></ul>");
      },
      add_nullOrUndefinedAreIgnored: () => {
        const dom = ul();
        assertEq(van2.add(dom, li("Item 1"), li("Item 2"), void 0, li("Item 3"), null), dom);
        assertEq(dom.outerHTML, "<ul><li>Item 1</li><li>Item 2</li><li>Item 3</li></ul>");
        assertEq(van2.add(dom, [li("Item 4"), li("Item 5"), void 0, li("Item 6"), null]), dom);
        assertEq(dom.outerHTML, "<ul><li>Item 1</li><li>Item 2</li><li>Item 3</li><li>Item 4</li><li>Item 5</li><li>Item 6</li></ul>");
        assertEq(van2.add(dom, [[void 0, li("Item 7"), null, [li("Item 8")]], null, li("Item 9"), void 0]), dom);
        assertEq(dom.outerHTML, "<ul><li>Item 1</li><li>Item 2</li><li>Item 3</li><li>Item 4</li><li>Item 5</li><li>Item 6</li><li>Item 7</li><li>Item 8</li><li>Item 9</li></ul>");
      },
      tags_svg: () => {
        const { circle, path: path2, svg } = van2.tags("http://www.w3.org/2000/svg");
        const dom = svg({ width: "16px", viewBox: "0 0 50 50" }, circle({ cx: "25", cy: "25", "r": "20", stroke: "black", "stroke-width": "2", fill: "yellow" }), circle({ cx: "16", cy: "20", "r": "2", stroke: "black", "stroke-width": "2", fill: "black" }), circle({ cx: "34", cy: "20", "r": "2", stroke: "black", "stroke-width": "2", fill: "black" }), path2({ "d": "M 15 30 Q 25 40, 35 30", stroke: "black", "stroke-width": "2", fill: "transparent" }));
        assertEq(dom.outerHTML, '<svg width="16px" viewBox="0 0 50 50"><circle cx="25" cy="25" r="20" stroke="black" stroke-width="2" fill="yellow"></circle><circle cx="16" cy="20" r="2" stroke="black" stroke-width="2" fill="black"></circle><circle cx="34" cy="20" r="2" stroke="black" stroke-width="2" fill="black"></circle><path d="M 15 30 Q 25 40, 35 30" stroke="black" stroke-width="2" fill="transparent"></path></svg>');
      },
      tags_math: () => {
        const { math, mi, mn, mo, mrow, msup } = van2.tags("http://www.w3.org/1998/Math/MathML");
        const dom = math(msup(mi("e"), mrow(mi("i"), mi("\u03C0"))), mo("+"), mn("1"), mo("="), mn("0"));
        assertEq(dom.outerHTML, "<math><msup><mi>e</mi><mrow><mi>i</mi><mi>\u03C0</mi></mrow></msup><mo>+</mo><mn>1</mn><mo>=</mo><mn>0</mn></math>");
      },
      // Validates the dummy behavior of reactive APIs works in Mini-Van
      dummyReactive: () => {
        const state1 = van2.state(1), state2 = van2.derive(() => state1.val * 2);
        const state3 = van2.state("abc"), state4 = van2.derive(() => state3.val.repeat(2));
        const state5 = van2.state(false), state6 = van2.derive(() => !state5.val);
        const dom = div2(state1, span(state2), p(() => `Prefix - ${state3.val}`), () => `${state4.oldVal} - Suffix`, p({
          "data-index": state1,
          "data-id": () => state2.val + 2,
          "data-title": state3,
          "data-text": () => `Prefix - ${state4.rawVal} - Suffix`
        }, () => state1.val, () => state2.oldVal, state3, () => state4.val), button({ onclick: van2.derive(() => state5.val ? 'console.log("Hello")' : 'alert("Hello")') }, "Button1"), button({ onclick: van2.derive(() => state6.val ? () => console.log("Hello") : () => alert("Hello")) }, "Button2"), () => (state5.val ? pre : div2)(state3), () => (state6.rawVal ? pre : div2)(state4));
        assertEq(dom.outerHTML, '<div>1<span>2</span><p>Prefix - abc</p>abcabc - Suffix<p data-index="1" data-id="4" data-title="abc" data-text="Prefix - abcabc - Suffix">12abcabcabc</p><button onclick="alert(&quot;Hello&quot;)">Button1</button><button>Button2</button><div>abc</div><pre>abcabc</pre></div>');
      },
      fragment: () => {
        const fragment = new DocumentFragment();
        fragment.append(div2(1), div2(2));
        const dom = div2(div2(0), fragment);
        assertEq(dom.outerHTML, "<div><div>0</div><div>1</div><div>2</div></div>");
      },
      html: () => {
        assertEq(van2.html(head(title("Hello")), body(div2("World"))), "<!DOCTYPE html><html><head><title>Hello</title></head><body><div>World</div></body></html>");
        assertEq(van2.html({ lang: "en" }, head(title("Hello")), body(div2("World"))), '<!DOCTYPE html><html lang="en"><head><title>Hello</title></head><body><div>World</div></body></html>');
      }
    };
    const examples = {
      miniVanServer: () => {
        assertEq(a({ href: "https://vanjs.org/" }, "\u{1F366}VanJS").outerHTML, `<a href="https://vanjs.org/">\u{1F366}VanJS</a>`);
        assertEq(button({ onclick: 'alert("Hello")' }, "Click").outerHTML, `<button onclick="alert(&quot;Hello&quot;)">Click</button>`);
        assertEq(input({ type: "text", value: "value" }).outerHTML, `<input type="text" value="value">`);
      }
    };
    const suites = { tests, examples };
    for (const [k, v] of Object.entries(suites)) {
      for (const [name, func] of Object.entries(v)) {
        ++window.numTests;
        const resultPre = pre();
        const msgPre = pre();
        const buttonDom = button("Rerun this test");
        buttonDom.onclick = () => {
          try {
            func();
            resultPre.innerText = "\u2705";
            msgPre.innerText = "Rerun succeeded!";
          } catch (e) {
            resultPre.innerText = "\u274C";
            msgPre.innerText = "Rerun failed!";
            throw e;
          }
        };
        van2.add(msgDom2, div2(pre(`Running ${k}.${name}...`), resultPre, pre(" "), buttonDom, pre(" "), msgPre));
        try {
          func();
          resultPre.innerText = "\u2705";
        } catch (e) {
          resultPre.innerText = "\u274C";
          van2.add(msgDom2, div2({ style: "color: red" }, "Test failed, please check console for error message."));
          throw e;
        }
      }
    }
  };
  var testVanFile = async (path, type) => {
    const van = await (type === "es6" ? import(path).then((r) => r.default) : fetch(path).then((r) => r.text()).then((t) => (eval(t), window.van)));
    const { div, h2 } = van.tags;
    const msgDom = div({ class: "testMsg" });
    van.add(document.getElementById("msgPanel"), h2(`Running tests for ${path}`), msgDom);
    runTests(van, msgDom);
  };

  // ../test/mini-van.test.forbundle.js
  window.testVanFile = testVanFile;
})();
