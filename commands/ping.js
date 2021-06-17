module.exports = {
	help: 'A check to make sure the bot is online.',
	usage: 'ping... what, did you expect anything fancy?',
	run(_client, message){
		message.channel.send("pong!").catch(console.error);
	}
}