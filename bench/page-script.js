// Script to open and close sidebar
const w3_open = () => {
  document.getElementById("mySidebar").style.display = "block"
  document.getElementById("myOverlay").style.display = "block"
}

const w3_close = () => {
  document.getElementById("mySidebar").style.display = "none"
  document.getElementById("myOverlay").style.display = "none"
}

const tocDom = document.getElementById("toc")

// Tracks the current toc item
const trackToc = () => {
  const allHeadings = [...document.querySelectorAll("h2,h3")]
  const currentHeadingIndex = allHeadings.findIndex(h => h.getBoundingClientRect().top >= 0)
  let currentHeading
  if (currentHeadingIndex < 0) currentHeading = allHeadings[allHeadings.length - 1]; else {
    currentHeading = allHeadings[currentHeadingIndex]
    if (currentHeadingIndex > 0 && currentHeading.getBoundingClientRect().top > innerHeight)
      currentHeading = allHeadings[currentHeadingIndex - 1]
  }
  for (const e of document.querySelectorAll("#toc li a"))
    if (e.href.split("#")[1] === currentHeading?.id) {
      e.classList.add("w3-opacity")
      const {top: tocTop, bottom: tocBottom} = tocDom.getBoundingClientRect()
      const {top: eTop, bottom: eBottom} = e.getBoundingClientRect()
      if (eBottom > tocBottom) tocDom.scrollTop += eBottom - tocBottom
      else if (eTop < tocTop) tocDom.scrollTop -= tocTop - eTop
    } else
      e.classList.remove("w3-opacity")
}
trackToc()
document.addEventListener("scroll", trackToc)
addEventListener("resize", trackToc)

const copy = e => {
  const file = e.previousElementSibling.innerText
  const importLine = file.includes("nomodule") ?
    `<script type="text/javascript" src="https://cdn.jsdelivr.net/gh/vanjs-org/van/public/${file}"><\/script>` :
    `import van from "https://cdn.jsdelivr.net/gh/vanjs-org/van/public/${file}"`
    navigator.clipboard.writeText(importLine)
      .then(() => e.querySelector(".tooltip").innerText = "Copied")
      .catch(() => e.querySelector(".tooltip").innerText = "Copy failed")
}

const resetTooltip = e => e.querySelector(".tooltip").innerText = "Copy import line"