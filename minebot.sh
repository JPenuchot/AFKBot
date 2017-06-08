#!/bin/bash

echo -n "User : "
read USER

echo -n "Pass : "
read -s PASS

echo

node bot.js ${USER} ${PASS}
ERRNO=${?}

while (( $ERRNO == 0 )); do
	sleep 5
	node bot.js ${USER} ${PASS}
	ERRNO=${?}
done
