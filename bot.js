#! /usr/bin/env node

const mf = require('mineflayer');
const readline = require('readline');
const fs = require('fs');

//	Param init

const rawJson = fs.readFileSync("config.json");
const config = JSON.parse(rawJson);

//	Arg management

if(!process.argv[2] && !config.user.pass){
	console.log("bot.js - AFK bot");
	console.log("Usage : node bot.js [PASS (If you didn't provide one in config.json)]");
	return;
}

//	Init cmd interface and bot

const rl = readline.createInterface({
	input: process.stdin,
	output: process.stdout
});

const bot = mf.createBot({
	host: config.server.address,
	port: config.server.port,
	username: config.user.username,
	password: (process.argv[2] ? process.argv[2] : config.user.pass)
});

//	Bot chat management

bot.on('chat', (username, message) => {
	if (username === bot.username) return;
	
	//	Log message
	console.log(username + ": " + message);

	//	Matches one of the keywords for sleeping
	if(config.keyword.sleep.find(elmt => message.search(elmt) != -1)){
		bot.chat(config.message.sleep);
		bot.quit();
		process.exit();
		return;
	}

	//	Answer if name was mentionned
	if(config.keyword.name.find(elmt => message.search(elmt) != -1)){
		bot.chat(config.message.afk);
	}
});

bot.on('login', () => {
	console.log("Connected !");
	bot.chat(config.message.online);
});

bot.on('playerJoined', (player) => {
	bot.chat("cc " + player + " ça sert à rien de me parler j'suis le bot de Jules, tu peux dire dodo pour que j'reco le temps de passer la nuit");
})

rl.on("line", input =>{
	if(input == "/quit"){
		bot.quit();
		process.exit(1);
		return;
	}

	if(input == "/reconnect"){
		bot.quit();
		process.exit();
		return;
	}

	bot.chat(input);
});