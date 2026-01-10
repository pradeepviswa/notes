#version control - GIT

## add
git add index.html

## revert add
git rm --cached index.html

## diff
git diff index.html

## configure email
git config --global user.email pradeep.viswa@gmail.com

## add git remote branch
git remote add https://github.com/pradeepviswa/demo-repo1.git

## new branch - pradeep
git branch pradeep

## swtich to new branch
git switch pradeep

## commit
git commit -m "first commit"

## verbose
git remote -v

## push code. new branch will also be created in repository with name "pradeep"
git push -u origin pradeep

