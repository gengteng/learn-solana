#!/bin/zsh

# Create a new project directory
mkdir -p $1
cd $1
npm init -y
npm install typescript @solana/web3.js esrun hpagent
touch $1.ts