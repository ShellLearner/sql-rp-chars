const { MessageEmbed } = require("discord.js");

module.exports = {
	help: "List all your characters.",
	usage: "view <name> <age>",
	prereqs: ["table"],
	run(client, message, _args) {
		//check if database connection exists
		if (!client.db){
			message.channel.send('WARNING: DATABASE CONNECTION DOES NOT EXIST OR WAS CLOSED. DO NOT CONTINUE.');
			return;
		} else {
			db = client.db
		}
		
		//fetch data
		try {
			let data = db.prepare(`SELECT * FROM \`${message.author.id}\``)
			let results = data.all()
			//make the embed and send it
			let chars = new MessageEmbed().setTitle(`${message.author.username}'s Characters:`)
			results.forEach(element => {
				chars.addField(element.name, `Age: ${element.age}, CharID: ${element.charid}`)
			})
			message.channel.send(chars);
		} catch (error) {
			message.channel.send('We\'ve run into a problem. Try again in a few minutes!');
			console.error(error);
		}
	}
}