#!/bin/sh

declare -a o=(dirtyReact inputs changes found toFake registerInputChange changed fakeEvent newElement properValue foundId reactIds)
declare -a n=(d i c f t r a e n p q w)

f=$(cat src/dirty_react.js)

for ((i=0; i<${#o[*]}; i++));
do
	f=$(echo "$f" | sed "s/${o[i]}/${n[i]}/g")
done

echo "$f" > temp
curl -X POST -s --data-urlencode 'input@temp' https://javascript-minifier.com/raw > dist/dirty_react.min.js
rm temp