# Benchmarking minivan.html
## Running benchmark for Bun with mini-van-plate@0.4.2
```
Running benchmark now...
Req/sec: 2498.500000
Req/sec: 2477.250000
Req/sec: 2577.750000
Req/sec: 2788.000000
Req/sec: 2603.000000
Req/sec: 2530.250000
Req/sec: 2675.000000
run.sh: line 1: 27474 Terminated: 15          bun run 0.4.2/bun-server.js
run.sh: line 1: 27478 Terminated: 15          http_load_test 8 127.0.0.1 8080
```
## Running benchmark for Deno with mini-van-plate@0.4.2
```
Listening on http://localhost:8080/
Running benchmark now...
Req/sec: 2960.750000
Req/sec: 3025.750000
Req/sec: 2972.750000
Req/sec: 2948.250000
Req/sec: 3042.250000
Req/sec: 3035.250000
Req/sec: 3027.750000
run.sh: line 1: 27528 Terminated: 15          deno run --allow-net --allow-read 0.4.2/deno-server.js
run.sh: line 1: 27530 Terminated: 15          http_load_test 8 127.0.0.1 8080
```
## Running benchmark for Node with mini-van-plate@0.4.2
```
Running benchmark now...
Req/sec: 2841.000000
Req/sec: 2910.750000
Req/sec: 2890.500000
Req/sec: 2919.750000
Req/sec: 2906.500000
Req/sec: 2888.750000
Req/sec: 2920.750000
run.sh: line 1: 27758 Terminated: 15          http_load_test 8 127.0.0.1 8080
run.sh: line 1: 27756 Terminated: 15          node 0.4.2/node-server.js
```
## Running benchmark for Bun with mini-van-plate@0.5.0
```
Running benchmark now...
Req/sec: 3067.250000
Req/sec: 2990.000000
Req/sec: 3126.000000
Req/sec: 3014.500000
Req/sec: 2996.500000
Req/sec: 3054.500000
Req/sec: 3040.750000
run.sh: line 1: 27842 Terminated: 15          http_load_test 8 127.0.0.1 8080
run.sh: line 1: 27839 Terminated: 15          bun run 0.5.0/bun-server.js
```
## Running benchmark for Deno with mini-van-plate@0.5.0
```
Listening on http://localhost:8080/
Running benchmark now...
Req/sec: 3163.250000
Req/sec: 3257.000000
Req/sec: 3268.500000
Req/sec: 3276.500000
Req/sec: 3272.750000
Req/sec: 3271.500000
Req/sec: 3274.750000
run.sh: line 1: 27887 Terminated: 15          deno run --allow-net --allow-read 0.5.0/deno-server.js
run.sh: line 1: 27891 Terminated: 15          http_load_test 8 127.0.0.1 8080
```
## Running benchmark for Node with mini-van-plate@0.5.0
```
Running benchmark now...
Req/sec: 3002.000000
Req/sec: 3075.250000
Req/sec: 3066.000000
Req/sec: 3077.000000
Req/sec: 3060.750000
Req/sec: 3086.000000
Req/sec: 3081.750000
run.sh: line 1: 27934 Terminated: 15          node 0.5.0/node-server.js
run.sh: line 1: 27936 Terminated: 15          http_load_test 8 127.0.0.1 8080
```
# Benchmarking Hello World
## Running benchmark for Bun with react@18.3.0
```
Server running on
  http://localhost:8080
Running benchmark now...
Req/sec: 59370.500000
Req/sec: 58632.000000
Req/sec: 59582.000000
Req/sec: 58613.250000
Req/sec: 58303.000000
Req/sec: 58449.750000
Req/sec: 58181.000000
run.sh: line 1: 27988 Terminated: 15          http_load_test 8 127.0.0.1 8080
run.sh: line 1: 27984 Terminated: 15          bun run 0.4.2/react-hello-world.jsx
```
## Running benchmark for Deno with react@18.3.0
```
Listening on http://localhost:8080/
Running benchmark now...
Req/sec: 42797.500000
Req/sec: 42599.000000
Req/sec: 42364.750000
Req/sec: 43201.000000
Req/sec: 40447.250000
Req/sec: 43262.000000
Req/sec: 42429.500000
run.sh: line 1: 28165 Terminated: 15          http_load_test 8 127.0.0.1 8080
run.sh: line 1: 28098 Terminated: 15          deno run --allow-net 0.4.2/react-hello-world.deno.jsx
```
## Running benchmark for Bun with mini-van-plate@0.4.2
```
Server running on
  http://localhost:8080
Running benchmark now...
Req/sec: 102894.750000
Req/sec: 103593.250000
Req/sec: 102335.750000
Req/sec: 102104.000000
Req/sec: 101584.750000
Req/sec: 101448.000000
Req/sec: 101141.000000
run.sh: line 1: 28282 Terminated: 15          http_load_test 8 127.0.0.1 8080
run.sh: line 1: 28280 Terminated: 15          bun run 0.4.2/van-plate-hello-world.js
```
## Running benchmark for Deno with mini-van-plate@0.4.2
```
Listening on http://localhost:8080/
Running benchmark now...
Req/sec: 83166.250000
Req/sec: 84713.000000
Req/sec: 85189.000000
Req/sec: 84892.250000
Req/sec: 85148.750000
Req/sec: 85250.500000
Req/sec: 84759.750000
run.sh: line 1: 28340 Terminated: 15          http_load_test 8 127.0.0.1 8080
run.sh: line 1: 28335 Terminated: 15          deno run --allow-net 0.4.2/van-plate-hello-world.deno.js
```
## Running benchmark for Bun with mini-van-plate@0.5.0
```
Server running on
  http://localhost:8080
Running benchmark now...
Req/sec: 105859.000000
Req/sec: 103879.500000
Req/sec: 104107.000000
Req/sec: 103962.000000
Req/sec: 103899.250000
Req/sec: 103350.000000
Req/sec: 102926.500000
run.sh: line 1: 28403 Terminated: 15          bun run 0.5.0/van-plate-hello-world.js
run.sh: line 1: 28406 Terminated: 15          http_load_test 8 127.0.0.1 8080
```
## Running benchmark for Deno with mini-van-plate@0.5.0
```
Listening on http://localhost:8080/
Running benchmark now...
Req/sec: 85280.500000
Req/sec: 86437.250000
Req/sec: 86985.000000
Req/sec: 87197.500000
Req/sec: 87265.500000
Req/sec: 87242.000000
Req/sec: 84827.000000
run.sh: line 1: 28478 Terminated: 15          http_load_test 8 127.0.0.1 8080
run.sh: line 1: 28476 Terminated: 15          deno run --allow-net 0.5.0/van-plate-hello-world.deno.js
```