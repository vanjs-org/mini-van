trap "jobs -p | xargs kill" EXIT

bench() {
  echo \`\`\`
  eval "$1 &"
  sleep 1
  http_load_test 8 127.0.0.1 8080 &
  sleep 30
  jobs -p | xargs kill
  sleep 1
  echo \`\`\`
}

echo "# Benchmarking minivan.html"

runMiniVan() {
  echo "## Running benchmark for Bun with mini-van-plate@$1"
  bench "bun run $1/bun-server.js"

  echo "## Running benchmark for Deno with mini-van-plate@$1"
  bench "deno run --allow-net --allow-read $1/deno-server.js"

  echo "## Running benchmark for Node with mini-van-plate@$1"
  bench "node $1/node-server.js"
}

runMiniVan 0.4.2
runMiniVan 0.5.0

echo "# Benchmarking Hello World"

echo "## Running benchmark for Bun with react@18.3.0"
bench "bun run 0.4.2/react-hello-world.jsx"

echo "## Running benchmark for Deno with react@18.3.0"
bench "deno run --allow-net 0.4.2/react-hello-world.deno.jsx"

runHelloWorld() {
  echo "## Running benchmark for Bun with mini-van-plate@$1"
  bench "bun run $1/van-plate-hello-world.js"

  echo "## Running benchmark for Deno with mini-van-plate@$1"
  bench "deno run --allow-net $1/van-plate-hello-world.deno.js"
}

runHelloWorld 0.4.2
runHelloWorld 0.5.0
