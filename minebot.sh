#!/bin/bash

echo "-= AFK bot launcher =-"

PASS=${1}

if [[ ${1} == "-i" ]]; then
	echo -n "Pass : "
	read -s PASS
fi
if [[ ${1} == "-h" ]]; then
	echo "minebot.sh - Minecraft AFK bot launcher"
	echo "Usage : minebot.sh ([PASSWORD] | -i | -h])"
	echo "-i	Interactive mode (asks for password)"
	echo "-h	Displays help"
	exit
fi

echo

node bot.js ${PASS}
ERRNO=${?}

while (( $ERRNO == 0 )); do
	sleep 5
	node bot.js ${PASS}
	ERRNO=${?}
done
