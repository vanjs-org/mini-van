(() => {
  // ../test/mini-van.test.js
  window.numTests = 0;
  var runTests = (vanObj, msgDom2) => {
    const { add, tags, html } = vanObj;
    const { a, body, button, div: div2, head, li, p, pre, title, ul } = tags;
    const assertEq = (lhs, rhs) => {
      if (lhs !== rhs)
        throw new Error(`Assertion failed. Expected equal. Actual lhs: ${lhs}, rhs: ${rhs}`);
    };
    const tests = {
      tagsTest_basic: () => {
        const dom = div2(p("\u{1F44B}Hello"), ul(li("\u{1F5FA}\uFE0FWorld"), li(a({ href: "https://vanjs.org/" }, "\u{1F366}VanJS"))));
        assertEq(dom.outerHTML, '<div><p>\u{1F44B}Hello</p><ul><li>\u{1F5FA}\uFE0FWorld</li><li><a href="https://vanjs.org/">\u{1F366}VanJS</a></li></ul></div>');
      },
      tagsTest_onclickHandler: () => {
        const dom = div2(button({ onclick: () => add(dom, p("Button clicked!")) }));
        dom.querySelector("button").click();
        assertEq(dom.outerHTML, "<div><button></button><p>Button clicked!</p></div>");
      },
      tagsTest_escape: () => {
        assertEq(p("<input>").outerHTML, "<p>&lt;input&gt;</p>");
        assertEq(div2("a && b").outerHTML, "<div>a &amp;&amp; b</div>");
        assertEq(div2("<input a && b>").outerHTML, "<div>&lt;input a &amp;&amp; b&gt;</div>");
      },
      tagsTest_nestedChildren: () => {
        assertEq(ul([li("Item 1"), li("Item 2"), li("Item 3")]).outerHTML, "<ul><li>Item 1</li><li>Item 2</li><li>Item 3</li></ul>");
        assertEq(ul([[li("Item 1"), [li("Item 2")]], li("Item 3")]).outerHTML, "<ul><li>Item 1</li><li>Item 2</li><li>Item 3</li></ul>");
      },
      tagsTest_nullOrUndefinedAreIgnored: () => {
        assertEq(ul(li("Item 1"), li("Item 2"), void 0, li("Item 3"), null).outerHTML, "<ul><li>Item 1</li><li>Item 2</li><li>Item 3</li></ul>");
        assertEq(ul([li("Item 1"), li("Item 2"), void 0, li("Item 3"), null]).outerHTML, "<ul><li>Item 1</li><li>Item 2</li><li>Item 3</li></ul>");
        assertEq(ul([[void 0, li("Item 1"), null, [li("Item 2")]], null, li("Item 3"), void 0]).outerHTML, "<ul><li>Item 1</li><li>Item 2</li><li>Item 3</li></ul>");
      },
      addTest_basic: () => {
        const dom = ul();
        assertEq(add(dom, li("Item 1"), li("Item 2")), dom);
        assertEq(dom.outerHTML, "<ul><li>Item 1</li><li>Item 2</li></ul>");
        add(dom, li("Item 3"), li("Item 4"), li("Item 5"));
        assertEq(dom.outerHTML, "<ul><li>Item 1</li><li>Item 2</li><li>Item 3</li><li>Item 4</li><li>Item 5</li></ul>");
        assertEq(add(dom), dom);
        assertEq(dom.outerHTML, "<ul><li>Item 1</li><li>Item 2</li><li>Item 3</li><li>Item 4</li><li>Item 5</li></ul>");
      },
      addTest_nestedChildren: () => {
        const dom = ul();
        assertEq(add(dom, [li("Item 1"), li("Item 2")]), dom);
        assertEq(dom.outerHTML, "<ul><li>Item 1</li><li>Item 2</li></ul>");
        assertEq(add(dom, [[li("Item 3"), [li("Item 4")]], li("Item 5")]), dom);
        assertEq(dom.outerHTML, "<ul><li>Item 1</li><li>Item 2</li><li>Item 3</li><li>Item 4</li><li>Item 5</li></ul>");
        assertEq(add(dom, [[[]]]), dom);
        assertEq(dom.outerHTML, "<ul><li>Item 1</li><li>Item 2</li><li>Item 3</li><li>Item 4</li><li>Item 5</li></ul>");
      },
      addTest_nullOrUndefinedAreIgnored: () => {
        const dom = ul();
        assertEq(add(dom, li("Item 1"), li("Item 2"), void 0, li("Item 3"), null), dom);
        assertEq(dom.outerHTML, "<ul><li>Item 1</li><li>Item 2</li><li>Item 3</li></ul>");
        assertEq(add(dom, [li("Item 4"), li("Item 5"), void 0, li("Item 6"), null]), dom);
        assertEq(dom.outerHTML, "<ul><li>Item 1</li><li>Item 2</li><li>Item 3</li><li>Item 4</li><li>Item 5</li><li>Item 6</li></ul>");
        assertEq(add(dom, [[void 0, li("Item 7"), null, [li("Item 8")]], null, li("Item 9"), void 0]), dom);
        assertEq(dom.outerHTML, "<ul><li>Item 1</li><li>Item 2</li><li>Item 3</li><li>Item 4</li><li>Item 5</li><li>Item 6</li><li>Item 7</li><li>Item 8</li><li>Item 9</li></ul>");
      },
      htmlTest: () => {
        assertEq(html(head(title("Hello")), body(div2("World"))), "<!DOCTYPE html><html><head><title>Hello</title></head><body><div>World</div></body></html>");
        assertEq(html({ lang: "en" }, head(title("Hello")), body(div2("World"))), '<!DOCTYPE html><html lang="en"><head><title>Hello</title></head><body><div>World</div></body></html>');
      }
    };
    const suites = { tests };
    for (const [k, v] of Object.entries(suites)) {
      for (const [name, func] of Object.entries(v)) {
        ++window.numTests;
        const resultPre = pre();
        const msgPre = pre();
        add(msgDom2, div2(pre(`Running ${k}.${name}...`), resultPre, pre(" "), pre(button({ onclick: () => {
          try {
            func();
            resultPre.innerText = "\u2705";
            msgPre.innerText = "Rerun succeeded!";
          } catch (e) {
            resultPre.innerText = "\u274C";
            msgPre.innerText = "Rerun failed!";
            throw e;
          }
        } }, "Rerun this test")), pre(" "), msgPre));
        try {
          func();
          resultPre.innerText = "\u2705";
        } catch (e) {
          resultPre.innerText = "\u274C";
          add(msgDom2, div2({ style: "color: red" }, "Test failed, please check console for error message."));
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
