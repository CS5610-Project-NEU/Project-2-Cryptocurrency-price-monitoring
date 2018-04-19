#!/bin/bash

export PORT=5600
export MIX_ENV=prod
export GIT_PATH=/home/coinbase/src/coinbase

PWD=`pwd`
if [ $PWD != $GIT_PATH ]; then
	echo "Error: Must check out git repo to $GIT_PATH"
	echo "  Current directory is $PWD"
	exit 1
fi

if [ $USER != "coinbase" ]; then
	echo "Error: must run as user 'coinbase'"
	echo "  Current user is $USER"
	exit 2
fi

mix deps.get
(cd assets && npm install)
(cd assets && ./node_modules/brunch/bin/brunch b -p)
mix phx.digest
mix release --env=prod

mkdir -p ~/www
mkdir -p ~/old

NOW=`date +%s`
if [ -d ~/www/coinbase ]; then
	echo mv ~/www/coinbase ~/old/$NOW
	mv ~/www/coinbase ~/old/$NOW
fi

mkdir -p ~/www/coinbase
REL_TAR=~/src/coinbase/_build/prod/rel/coinbase/releases/0.0.1/coinbase.tar.gz
(cd ~/www/coinbase && tar xzvf $REL_TAR)

crontab - <<CRONTAB
@reboot bash /home/coinbase/src/coinbase/start.sh
CRONTAB

#. start.sh
