#!/usr/bin/env bash


npm run build
rsync -avz dist/ jgibson@jgibby.xyz:~/projects/blog/budget
ssh jgibson@jgibby.xyz << FIX
 cd ~/projects/blog/budget
 sed -i "s/\/assets/assets/" index.html
FIX
