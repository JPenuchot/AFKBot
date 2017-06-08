#! /usr/bin/env node

//	Init

const mf = require('mineflayer');
const rls = require('readline-sync');
const readline = require('readline');
const fs = require('fs');

//	Keywords init

const rawJson = fs.readFileSync("config.json");
const config = JSON.parse(rawJson);

const user = process.argv[2];
const pass = process.argv[3];

if(!user || !pass){
	console.log("bot.js - AFK bot");
	console.log("Usage : node bot.js [USER] [PASS]");
	return;
}

let rl = readline.createInterface({
	input: process.stdin,
	output: process.stdout
});

let bot = mf.createBot({
	host: "serv.penuch.it",
	port: 25565,
	username: user,
	password: pass,
});

bot.on('chat', (username, message) => {
	if (username === bot.username) return;
	
	//	Log message
	console.log(username + " : " + message);

	//	Matches one of the keywords for sleeping
	if(config.sleep.find(elmt => message.search(elmt) != -1)){
		bot.quit();
		process.exit();
		return;
	}

	//	Answer if name was mentionned
	if(config.name.find(elmt => message.search(elmt) != -1)){
		bot.chat("J'suis AFK frérot, si tu veux que j'reco en balle tape dodo dans ton message et j'reco.");
	}
});

bot.on('login', () => {
	console.log("Connected !");
	bot.chat("cc c'est l'AFK bot de Jules si tu dis dodo je reco pour passer le jour.");
});

rl.on("line", input =>{
	if(input == "/deco"){
		bot.quit();
		process.exit(1);
		return;
	}

	bot.chat(input);
});