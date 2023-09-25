import { htmlToVanCode } from "vanjs-converter"

const {code, tags} = htmlToVanCode(await Bun.file("minivan.html").text(), {skipEmptyText: true})

await Bun.write("page.js",
  (await Bun.file("page-template.js").text())
    .replace("/* TAGS */", tags.filter(t => t !== "html").join(", "))
    .replace("/* DOM */", code.join("\n"))
)
