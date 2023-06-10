window.numTests = 0;
const runTests = (vanObj, msgDom) => {
    const { add, tags, html } = vanObj;
    const { a, body, button, div, head, li, p, pre, title, ul } = tags;
    const assertEq = (lhs, rhs) => {
        if (lhs !== rhs)
            throw new Error(`Assertion failed. Expected equal. Actual lhs: ${lhs}, rhs: ${rhs}`);
    };
    const tests = {
        tagsTest_basic: () => {
            const dom = div(p("👋Hello"), ul(li("🗺️World"), li(a({ href: "https://vanjs.org/" }, "🍦VanJS"))));
            assertEq(dom.outerHTML, '<div><p>👋Hello</p><ul><li>🗺️World</li><li><a href="https://vanjs.org/">🍦VanJS</a></li></ul></div>');
        },
        tagsTest_onclickHandler: () => {
            const dom = div(button({ onclick: () => add(dom, p("Button clicked!")) }));
            dom.querySelector("button").click();
            assertEq(dom.outerHTML, "<div><button></button><p>Button clicked!</p></div>");
        },
        tagsTest_escape: () => {
            assertEq(p("<input>").outerHTML, "<p>&lt;input&gt;</p>");
            assertEq(div("a && b").outerHTML, "<div>a &amp;&amp; b</div>");
            assertEq(div("<input a && b>").outerHTML, "<div>&lt;input a &amp;&amp; b&gt;</div>");
        },
        tagsTest_nestedChildren: () => {
            assertEq(ul([li("Item 1"), li("Item 2"), li("Item 3")]).outerHTML, "<ul><li>Item 1</li><li>Item 2</li><li>Item 3</li></ul>");
            // Deeply nested
            assertEq(ul([[li("Item 1"), [li("Item 2")]], li("Item 3")]).outerHTML, "<ul><li>Item 1</li><li>Item 2</li><li>Item 3</li></ul>");
        },
        tagsTest_nullOrUndefinedAreIgnored: () => {
            assertEq(ul(li("Item 1"), li("Item 2"), undefined, li("Item 3"), null).outerHTML, "<ul><li>Item 1</li><li>Item 2</li><li>Item 3</li></ul>");
            assertEq(ul([li("Item 1"), li("Item 2"), undefined, li("Item 3"), null]).outerHTML, "<ul><li>Item 1</li><li>Item 2</li><li>Item 3</li></ul>");
            // Deeply nested
            assertEq(ul([[undefined, li("Item 1"), null, [li("Item 2")]], null, li("Item 3"), undefined]).outerHTML, "<ul><li>Item 1</li><li>Item 2</li><li>Item 3</li></ul>");
        },
        addTest_basic: () => {
            const dom = ul();
            assertEq(add(dom, li("Item 1"), li("Item 2")), dom);
            assertEq(dom.outerHTML, "<ul><li>Item 1</li><li>Item 2</li></ul>");
            add(dom, li("Item 3"), li("Item 4"), li("Item 5"));
            assertEq(dom.outerHTML, "<ul><li>Item 1</li><li>Item 2</li><li>Item 3</li><li>Item 4</li><li>Item 5</li></ul>");
            // No-op if no children specified
            assertEq(add(dom), dom);
            assertEq(dom.outerHTML, "<ul><li>Item 1</li><li>Item 2</li><li>Item 3</li><li>Item 4</li><li>Item 5</li></ul>");
        },
        addTest_nestedChildren: () => {
            const dom = ul();
            assertEq(add(dom, [li("Item 1"), li("Item 2")]), dom);
            assertEq(dom.outerHTML, "<ul><li>Item 1</li><li>Item 2</li></ul>");
            // Deeply nested
            assertEq(add(dom, [[li("Item 3"), [li("Item 4")]], li("Item 5")]), dom);
            assertEq(dom.outerHTML, "<ul><li>Item 1</li><li>Item 2</li><li>Item 3</li><li>Item 4</li><li>Item 5</li></ul>");
            // No-op if no children specified
            assertEq(add(dom, [[[]]]), dom);
            assertEq(dom.outerHTML, "<ul><li>Item 1</li><li>Item 2</li><li>Item 3</li><li>Item 4</li><li>Item 5</li></ul>");
        },
        addTest_nullOrUndefinedAreIgnored: () => {
            const dom = ul();
            assertEq(add(dom, li("Item 1"), li("Item 2"), undefined, li("Item 3"), null), dom);
            assertEq(dom.outerHTML, "<ul><li>Item 1</li><li>Item 2</li><li>Item 3</li></ul>");
            assertEq(add(dom, [li("Item 4"), li("Item 5"), undefined, li("Item 6"), null]), dom);
            assertEq(dom.outerHTML, "<ul><li>Item 1</li><li>Item 2</li><li>Item 3</li><li>Item 4</li><li>Item 5</li><li>Item 6</li></ul>");
            // Deeply nested
            assertEq(add(dom, [[undefined, li("Item 7"), null, [li("Item 8")]], null, li("Item 9"), undefined]), dom);
            assertEq(dom.outerHTML, "<ul><li>Item 1</li><li>Item 2</li><li>Item 3</li><li>Item 4</li><li>Item 5</li><li>Item 6</li><li>Item 7</li><li>Item 8</li><li>Item 9</li></ul>");
        },
        htmlTest: () => {
            assertEq(html(head(title("Hello")), body(div("World"))), "<!DOCTYPE html><html><head><title>Hello</title></head><body><div>World</div></body></html>");
            assertEq(html({ lang: "en" }, head(title("Hello")), body(div("World"))), '<!DOCTYPE html><html lang="en"><head><title>Hello</title></head><body><div>World</div></body></html>');
        },
    };
    const suites = { tests };
    for (const [k, v] of Object.entries(suites)) {
        for (const [name, func] of Object.entries(v)) {
            ++window.numTests;
            const resultPre = pre();
            const msgPre = pre();
            add(msgDom, div(pre(`Running ${k}.${name}...`), resultPre, pre(" "), pre(button({ onclick: () => {
                    try {
                        func();
                        resultPre.innerText = "✅";
                        msgPre.innerText = "Rerun succeeded!";
                    }
                    catch (e) {
                        resultPre.innerText = "❌";
                        msgPre.innerText = "Rerun failed!";
                        throw e;
                    }
                } }, "Rerun this test")), pre(" "), msgPre));
            try {
                func();
                resultPre.innerText = "✅";
            }
            catch (e) {
                resultPre.innerText = "❌";
                add(msgDom, div({ style: "color: red" }, "Test failed, please check console for error message."));
                throw e;
            }
        }
    }
};
export const testVanFile = async (path, type) => {
    const van = await (type === "es6" ? import(path).then(r => r.default) : fetch(path).then(r => r.text()).then(t => (eval(t), window.van)));
    const { div, h2 } = van.tags;
    const msgDom = div({ class: "testMsg" });
    van.add(document.getElementById("msgPanel"), h2(`Running tests for ${path}`), msgDom);
    runTests(van, msgDom);
};
