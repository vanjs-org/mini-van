# Benchmarking minivan.html
## Running benchmark for Bun with mini-van-plate@0.4.2
```
Running benchmark now...
Req/sec: 2585.750000
Req/sec: 2516.000000
Req/sec: 2541.250000
Req/sec: 2494.750000
Req/sec: 2531.250000
Req/sec: 2672.500000
Req/sec: 2770.500000
run.sh: line 3: 76345 Terminated: 15          bun run 0.4.2/bun-server.js
run.sh: line 3: 76349 Terminated: 15          http_load_test 8 127.0.0.1 8080
```
## Running benchmark for Deno with mini-van-plate@0.4.2
```
Listening on http://localhost:8080/
Running benchmark now...
Req/sec: 3017.500000
Req/sec: 3053.250000
Req/sec: 3098.750000
Req/sec: 3066.000000
Req/sec: 3056.750000
Req/sec: 3073.750000
Req/sec: 3091.500000
run.sh: line 3: 76399 Terminated: 15          deno run --allow-net --allow-read 0.4.2/deno-server.js
run.sh: line 3: 76404 Terminated: 15          http_load_test 8 127.0.0.1 8080
```
## Running benchmark for Node with mini-van-plate@0.4.2
```
Running benchmark now...
Req/sec: 2699.250000
Req/sec: 2901.250000
Req/sec: 2899.000000
Req/sec: 2901.750000
Req/sec: 2901.250000
Req/sec: 2845.000000
Req/sec: 2703.500000
run.sh: line 3: 76466 Terminated: 15          node 0.4.2/node-server.js
run.sh: line 3: 76468 Terminated: 15          http_load_test 8 127.0.0.1 8080
```
## Running benchmark for Bun with mini-van-plate@0.5.0
```
Running benchmark now...
Req/sec: 3282.250000
Req/sec: 3106.500000
Req/sec: 3121.250000
Req/sec: 3062.000000
Req/sec: 3124.250000
Req/sec: 3276.500000
Req/sec: 3396.750000
run.sh: line 3: 76801 Terminated: 15          bun run 0.5.0/bun-server.js
run.sh: line 3: 76803 Terminated: 15          http_load_test 8 127.0.0.1 8080
```
## Running benchmark for Deno with mini-van-plate@0.5.0
```
Listening on http://localhost:8080/
Running benchmark now...
Req/sec: 3196.000000
Req/sec: 3325.750000
Req/sec: 3314.500000
Req/sec: 3321.250000
Req/sec: 3322.250000
Req/sec: 3337.250000
Req/sec: 3293.750000
run.sh: line 3: 76848 Terminated: 15          deno run --allow-net --allow-read 0.5.0/deno-server.js
run.sh: line 3: 76850 Terminated: 15          http_load_test 8 127.0.0.1 8080
```
## Running benchmark for Node with mini-van-plate@0.5.0
```
Running benchmark now...
Req/sec: 3031.500000
Req/sec: 3086.750000
Req/sec: 3127.500000
Req/sec: 3148.500000
Req/sec: 3128.000000
Req/sec: 3139.250000
Req/sec: 3144.750000
run.sh: line 3: 76911 Terminated: 15          http_load_test 8 127.0.0.1 8080
run.sh: line 3: 76896 Terminated: 15          node 0.5.0/node-server.js
```
# Benchmarking Hello World
## Running benchmark for Bun with react@18.3.0
```
Server running on
  http://localhost:8080
Running benchmark now...
Req/sec: 58373.250000
Req/sec: 58960.000000
Req/sec: 58509.500000
Req/sec: 58442.750000
Req/sec: 58068.250000
Req/sec: 57749.250000
Req/sec: 57055.500000
run.sh: line 3: 76960 Terminated: 15          http_load_test 8 127.0.0.1 8080
run.sh: line 3: 76954 Terminated: 15          bun run 0.4.2/react-hello-world.bun.jsx
```
## Running benchmark for Deno with react@18.3.0
```
Listening on http://localhost:8080/
Running benchmark now...
Req/sec: 48874.500000
Req/sec: 46166.500000
Req/sec: 44004.500000
Req/sec: 42465.000000
Req/sec: 40296.750000
Req/sec: 43030.750000
Req/sec: 43400.750000
run.sh: line 3: 77007 Terminated: 15          http_load_test 8 127.0.0.1 8080
run.sh: line 3: 77005 Terminated: 15          deno run --allow-net 0.4.2/react-hello-world.deno.jsx
```
## Running benchmark for Node with react@18.3.0
```
Running benchmark now...
Req/sec: 30960.500000
Req/sec: 31515.000000
Req/sec: 30458.000000
Req/sec: 27056.500000
Req/sec: 30894.250000
Req/sec: 27445.000000
Req/sec: 30720.500000
run.sh: line 3: 77061 Terminated: 15          http_load_test 8 127.0.0.1 8080
run.sh: line 3: 77059 Terminated: 15          node 0.4.2/react-hello-world.node.js
```
## Running benchmark for Bun with mini-van-plate@0.4.2
```
Server running on
  http://localhost:8080
Running benchmark now...
Req/sec: 101427.250000
Req/sec: 100640.250000
Req/sec: 98149.000000
Req/sec: 99705.250000
Req/sec: 99577.250000
Req/sec: 97967.500000
Req/sec: 98905.000000
run.sh: line 3: 77400 Terminated: 15          http_load_test 8 127.0.0.1 8080
run.sh: line 3: 77398 Terminated: 15          bun run 0.4.2/van-plate-hello-world.bun.js
```
## Running benchmark for Deno with mini-van-plate@0.4.2
```
Listening on http://localhost:8080/
Running benchmark now...
Req/sec: 82596.000000
Req/sec: 84316.250000
Req/sec: 84730.250000
Req/sec: 82399.250000
Req/sec: 84001.500000
Req/sec: 84563.500000
Req/sec: 84610.500000
run.sh: line 3: 77453 Terminated: 15          deno run --allow-net 0.4.2/van-plate-hello-world.deno.js
run.sh: line 3: 77455 Terminated: 15          http_load_test 8 127.0.0.1 8080
```
## Running benchmark for Node with mini-van-plate@0.4.2
```
Running benchmark now...
Req/sec: 66459.000000
Req/sec: 67861.500000
Req/sec: 67182.250000
Req/sec: 67779.750000
Req/sec: 67525.000000
Req/sec: 67412.750000
Req/sec: 67724.500000
run.sh: line 3: 77536 Terminated: 15          http_load_test 8 127.0.0.1 8080
run.sh: line 3: 77532 Terminated: 15          node 0.4.2/van-plate-hello-world.node.js
```
## Running benchmark for Bun with mini-van-plate@0.5.0
```
Server running on
  http://localhost:8080
Running benchmark now...
Req/sec: 103560.250000
Req/sec: 103471.500000
Req/sec: 101791.750000
Req/sec: 101397.000000
Req/sec: 101507.500000
Req/sec: 101234.250000
Req/sec: 100538.250000
run.sh: line 3: 77584 Terminated: 15          http_load_test 8 127.0.0.1 8080
run.sh: line 3: 77581 Terminated: 15          bun run 0.5.0/van-plate-hello-world.bun.js
```
## Running benchmark for Deno with mini-van-plate@0.5.0
```
Listening on http://localhost:8080/
Running benchmark now...
Req/sec: 84554.500000
Req/sec: 85871.000000
Req/sec: 86574.000000
Req/sec: 86673.750000
Req/sec: 86699.500000
Req/sec: 85811.500000
Req/sec: 86502.000000
run.sh: line 3: 77633 Terminated: 15          http_load_test 8 127.0.0.1 8080
run.sh: line 3: 77631 Terminated: 15          deno run --allow-net 0.5.0/van-plate-hello-world.deno.js
```
## Running benchmark for Node with mini-van-plate@0.5.0
```
Running benchmark now...
Req/sec: 60537.500000
Req/sec: 67495.750000
Req/sec: 68090.000000
Req/sec: 68649.500000
Req/sec: 68582.250000
Req/sec: 68855.500000
Req/sec: 68807.000000
run.sh: line 3: 77789 Terminated: 15          http_load_test 8 127.0.0.1 8080
run.sh: line 3: 77765 Terminated: 15          node 0.5.0/van-plate-hello-world.node.js
```
