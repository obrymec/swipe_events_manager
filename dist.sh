#!/bin/sh

# Destroys the old `build` folder.
rm -rf ./build
# Remakes the `build` and `es5` folders.
mkdir ./build && mkdir ./build/es5
# Compiles typescript codes regardless configs.
npx tsc --build ./tsconfig.es6.json && npx tsc --build ./tsconfig.es5.json
# Adds javascript code to his content.
echo "var exports={};" >> ./build/es5/export.js
# Merges `export.js` and `swipe.js` files.
cat ./build/es5/swipe.js >> ./build/es5/export.js
# Removes `swipe.js` file.
rm -rf ./build/es5/swipe.js
# Renames `export.js` into `swipe.js`.
mv ./build/es5/export.js ./build/es5/swipe.js
# Compress and minify `swipe.js` file to generate `swipe.min.js`.
npx uglifyjs -c -m -o ./build/es5/swipe.min.js -- ./build/es5/swipe.js
