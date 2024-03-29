//Setting up all our dependencies and configuration settings
require('dotenv').config()
const Discord = require("discord.js")
const client = new Discord.Client();
const fs = require("fs");

client.on("ready", () => {
	//a nice indicator, baked directly into the index file. Redundancy!
	console.log('Bot is ready!');
});

fs.readdir("./events", (err, files) => {
	if (err) {console.error(err); return;}
	files.forEach((item) => {
		if (!item.endsWith(".js")) return;
		const event = require(`./events/${item}`);
		let eventName = item.split('.')[0]
		client.on(eventName, event.bind(null, client));
		delete require.cache[require.resolve(`./events/${item}`)];
	});
})

client.commands = new Map()

fs.readdir("./commands", (err, files) => {
	if (err) {console.error(err); return;}
	files.forEach((item) => {
		//read any folders
		if (!item.includes('.')){
			fs.readdir(`./commands/${item}`, (err, moduleFiles) => {
				if (err) {console.error(err); return;}
				console.log('reading module ' + item)
				moduleFiles.forEach((moduleItem) => {
					if (!moduleItem.endsWith(".js")) return;
					let modfunc = require(`./commands/${item}/${moduleItem}`);
					let modname = moduleItem.split('.')[0];
					console.log(`loading up ${item}/${moduleItem}`);
					client.commands.set(modname, modfunc);
				})
			})
		}

		//read loose files
		if (!item.endsWith(".js")) return;
		let commandf = require(`./commands/${item}`);
		let cname = item.split('.')[0];
		console.log(`loading up ${cname}`);
		client.commands.set(cname, commandf);
	})
})

client.login(process.env.DISCORD_TOKEN)
