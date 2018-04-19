#!/bin/bash

export PORT=5600

cd ~/www/coinbase
./bin/coinbase stop || true
./bin/coinbase start
