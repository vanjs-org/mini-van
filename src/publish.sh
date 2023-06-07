set -e

VER=$(jq -r ".version" ../package.json)
echo -n $VER > ../public/mini-van.version
TERSER=../node_modules/terser/bin/terser

cp mini-van.js ../public/mini-van-$VER.js
cp mini-van.d.ts ../public/mini-van-$VER.d.ts
../node_modules/esbuild/bin/esbuild mini-van.forbundle.js --bundle --outfile=../public/mini-van-$VER.nomodule.js

$TERSER mini-van.js --compress --toplevel --mangle --mangle-props keep_quoted -f wrap_func_args=false -o ../public/mini-van-$VER.min.js
cp mini-van.d.ts ../public/mini-van-$VER.min.d.ts
MIN_NOMODULE=$($TERSER ../public/mini-van-$VER.nomodule.js --compress --toplevel --mangle --mangle-props keep_quoted -f wrap_func_args=false)
echo -n "{let${MIN_NOMODULE:3}}" > ../public/mini-van-$VER.nomodule.min.js
# echo -n "$MIN_NOMODULE" > ../public/mini-van-$VER.nomodule.min.js

cp ../public/mini-van-$VER.js ../public/mini-van-latest.js
cp ../public/mini-van-$VER.d.ts ../public/mini-van-latest.d.ts
cp ../public/mini-van-$VER.min.js ../public/mini-van-latest.min.js
cp ../public/mini-van-$VER.min.d.ts ../public/mini-van-latest.min.d.ts
cp ../public/mini-van-$VER.nomodule.js ../public/mini-van-latest.nomodule.js
cp ../public/mini-van-$VER.nomodule.min.js ../public/mini-van-latest.nomodule.min.js

# Testing
../node_modules/typescript/bin/tsc -m es2020 -t es2017 ../test/mini-van.test.ts
../node_modules/esbuild/bin/esbuild ../test/mini-van.test.forbundle.js --bundle --outfile=../test/mini-van.test.nomodule.js
