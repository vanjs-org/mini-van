import { readdirSync } from "fs"
import { join } from "path"

const [source, ...excludes] = Bun.argv.slice(2)

for (const f of readdirSync(source, {withFileTypes: true})
  .filter(f => f.isFile() && excludes.indexOf(f.name) < 0)) {
  console.log(`rm ${f.name}`)
  console.log(`cp ${join(source, f.name)} .`)
}
