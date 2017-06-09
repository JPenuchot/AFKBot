#!/bin/bash

echo "-= AFK bot launcher =-"

PASS=${1}

if [[ ${1} == "-i" ]]; then	#	Interactive mode
	echo -n "Pass : "
	read -s PASS
	echo
fi
if [[ ${1} == "-h" ]]; then	#	Help
	echo "minebot.sh - Minecraft AFK bot launcher"
	echo "Usage : minebot.sh ([PASSWORD] | -i | -h])"
	echo "-i	Interactive mode (asks for password)"
	echo "-h	Displays help"
	exit
fi

node bot.js ${PASS}
ERRNO=${?}

while (( $ERRNO == 0 )); do
	echo "Disconnected ! Waiting 5 sec. before reconnection..."
	sleep 5
	node bot.js ${PASS}
	ERRNO=${?}
done

echo "See you !"