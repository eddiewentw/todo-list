# build project
yarn run build

PROJECT_NAME='todo-list'
FOLDER_NAME="$PROJECT_NAME-gh-pages"

# create gh-pages folder
echo 'Copy project folder...'

rm -rf ../$FOLDER_NAME
cp -r ./ ../$FOLDER_NAME

# gh-pages branch
cd ../$FOLDER_NAME
echo 'Check out to `gh-pages` branch'

git checkout gh-pages

# delete files in master branch, move build/* out
rm *.*
rm -r __tests__ config node_modules src
mv build/* ./
rm -r build

git add .
git commit --allow-empty -m "$(git describe --abbrev=0)"
git push origin gh-pages
