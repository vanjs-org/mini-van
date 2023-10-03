# Benchmark the SSR Performance of Mini-Van on Bun, Deno and Node.js

This directory is for the benchmark of **Mini-Van**'s SSR performance ([`van-plate` mode](https://github.com/vanjs-org/mini-van#van-plate-mode) is being used) on [Bun](https://bun.sh/), [Deno](https://deno.com/) and [Node.js](https://nodejs.org/).

## Methodology

We want to benchmark the SSR performance of **Mini-Van** for webpages with typical complexity. For that reason, https://vanjs.org/minivan was used. We downloaded the HTML file for https://vanjs.org/minivan, converted the HTML file to the equivalent **VanJS** code via [**VanJS** Code Converter](https://github.com/vanjs-org/converter), and built HTTP servers with Bun, Deno and Node.js to serve the converted **VanJS** component.

The HTML file used for benchmark is [`minivan.html`](0.4.2/minivan.html) ([`page.js`](0.4.2/page.js) for the converted **Mini-Van** component). [`http_load_test`](https://github.com/uNetworking/uSockets/blob/master/examples/http_load_test.c) is used for measurement. We're benchmarking both [`mini-van-plate@0.4.2`](https://www.npmjs.com/package/mini-van-plate/v/0.4.2) and [`mini-van-plate@0.5.0`](https://www.npmjs.com/package/mini-van-plate/v/0.5.0) (where an [optimization](https://github.com/vanjs-org/mini-van/releases/tag/0.5.0) to reduce string concatenations was implemented).

_Tests were conducted on a MacBook Air, M1, 2020, running macOS 13.0 (Ventura)._

## Result

Req/Sec (_higher is better_)

| | `mini-van-plate@0.4.2` | `mini-van-plate@0.5.0` |
|-|------------------------|------------------------|
| Bun (`1.0.3`) | 2771 | 3397 |
| Deno (`1.37.0`) | 3092 | 3294 |
| Node (`20.0.0`) | 2704 | 3145 |

## React vs. Mini-Van

In addition, we also compared the SSR performance between React and **Mini-Van** on Bun, Deno and Node.js, using the `Hello, World!` examples [here](https://github.com/oven-sh/bun/tree/main/bench/react-hello-world).

Req/Sec (_higher is better_)

| | `react-dom@18.3.0` | `mini-van-plate@0.4.2` | `mini-van-plate@0.5.0` |
|-|--------------------|------------------------|------------------------|
| Bun (`1.0.3`) | 57056 | 98905 | 100538 |
| Deno (`1.37.0`) | 43401 | 84611 | 86502 |
| Node (`20.0.0`) | 30721 | 67724 | 68807 |

As we can see, **Mini-Van** is roughly **1.75X** ~ **2.25X** more efficient compared to React.

## Appendix

* [`run.sh`](run.sh): the script used for benchmark.
* [`run-logs.md`](run-logs.md): the detailed benchmark logs.
