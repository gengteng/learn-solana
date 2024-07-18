#!/bin/zsh

# Create a new project directory
mkdir -p $1
cd $1
npm init -y
npm install typescript @solana/web3.js @solana-developers/helpers esrun hpagent
touch $1.ts

echo 'npx esrun $1.ts' > run.sh
chmod +x run.sh

cp ../.env ./