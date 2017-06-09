#!/bin/bash

echo -n "Pass : "
read -s PASS

echo

node bot.js ${PASS}
ERRNO=${?}

while (( $ERRNO == 0 )); do
	sleep 5
	node bot.js ${PASS}
	ERRNO=${?}
done
