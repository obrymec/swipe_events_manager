#!/bin/sh

# Variables.
buildFolderPath="./build"
pkgFileName="swipe"
es5FolderPath=$buildFolderPath"/es5"
exportFilePath=$es5FolderPath"/export.js"
fullPkgPath=$es5FolderPath"/"$pkgFileName".js"
minifiedPkgPath=$es5FolderPath"/"$pkgFileName".min.js"
copyrightFilePath=$es5FolderPath"/copyright.txt"
copyrightContent="// SwipeEventsManager v1.0.5 | © CodiTheck organization"
tsconfigES5File="./tsconfig.es5.json"
tsconfigES6File="./tsconfig.es6.json"
exportContent="var exports={};"

# Destroys the old distribution folder.
rm -rf $buildFolderPath
# Remakes the distribution and ecmascript5 folders.
mkdir $buildFolderPath && mkdir $es5FolderPath
# Compiles typescript codes regardless configs.
npx tsc --build $tsconfigES6File && npx tsc --build $tsconfigES5File
# Adds a copyright text inside a file.
echo $copyrightContent >> $copyrightFilePath
# Adds exports's variable inside a file.
echo $exportContent >> $exportFilePath
# Imports that variable in package's file.
cat $fullPkgPath >> $exportFilePath
# Removes the old package's file.
rm -rf $fullPkgPath
# Generates the new package's file.
mv $exportFilePath $fullPkgPath
# Compress and minify it.
npx uglifyjs -c -m -o $minifiedPkgPath -- $fullPkgPath
# Adds the copyright to the minified package's file.
cat $copyrightFilePath >> $minifiedPkgPath
# Adds the copyright to the original package's file.
cat $copyrightFilePath >> $fullPkgPath
# Destroys the copyright file.
rm -rf $copyrightFilePath
