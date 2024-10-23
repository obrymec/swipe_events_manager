#!/bin/sh

# Variables.
buildFolderPath="./build"
pkgFileName="swipe"
cjsFolderPath=$buildFolderPath"/cjs"
exportFilePath=$cjsFolderPath"/export.js"
fullCJSPkgPath=$cjsFolderPath"/"$pkgFileName".js"
minifiedCJSPkgPath=$cjsFolderPath"/"$pkgFileName".min.js"
fullES6PkgPath=$buildFolderPath"/"$pkgFileName".js"
minifiedES6PkgPath=$buildFolderPath"/"$pkgFileName".min.js"
copyrightFilePath=$cjsFolderPath"/copyright.txt"
copyrightContent="// SwipeEventsManager v1.1.0 | © CodiTheck organization"
tsconfigCJSFile="./tsconfig.cjs.json"
tsconfigES6File="./tsconfig.es6.json"
exportContent="var exports={};"

# Destroys the old distribution folder.
rm -rf $buildFolderPath
# Remakes the distribution and ecmascript5 folders.
mkdir $buildFolderPath && mkdir $cjsFolderPath
# Compiles typescript codes regardless configs.
npx tsc --build $tsconfigES6File && npx tsc --build $tsconfigCJSFile
# Adds a copyright text inside a file.
echo $copyrightContent >> $copyrightFilePath
# Adds exports's variable inside a file.
echo $exportContent >> $exportFilePath
# Imports that variable in package's file.
cat $fullCJSPkgPath >> $exportFilePath
# Removes the old package's file.
rm -rf $fullCJSPkgPath
# Generates the new package's file.
mv $exportFilePath $fullCJSPkgPath
# Compress and minify cjs version.
npx uglifyjs -c -m -o $minifiedCJSPkgPath -- $fullCJSPkgPath
# Compress and minify es6 version.
npx uglifyjs -c -m -o $minifiedES6PkgPath -- $fullES6PkgPath
# Adds the copyright to the minified cjs support.
cat $copyrightFilePath >> $minifiedCJSPkgPath
# Adds the copyright to the original cjs support.
cat $copyrightFilePath >> $fullCJSPkgPath
# Adds the copyright to the minified es6 support.
cat $copyrightFilePath >> $minifiedES6PkgPath
# Adds the copyright to the original es6 support.
cat $copyrightFilePath >> $fullES6PkgPath
# Destroys the copyright file.
rm -rf $copyrightFilePath
