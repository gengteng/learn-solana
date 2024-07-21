#!/bin/zsh

if [ $# -eq 1 ]; then
  echo "Running $1"
  npx esrun $1
  exit
else
  echo "Running default create-token.ts"
  npx esrun create-token.ts
fi
