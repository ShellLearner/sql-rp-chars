module.exports = {
	help: "It deletes a character",
	usage: "delete <name>",
	prereqs: ["table"],
	run(client, message, args) {
		//check if database connection exists
		if (!client.db){
			message.channel.send('WARNING: DATABASE CONNECTION DOES NOT EXIST OR WAS CLOSED. DO NOT CONTINUE.');
			return;
		} else {
			db = client.db
		}

        let name = args.join(' ')
		//check if the character exists
		try {
			let test = db.prepare(`SELECT charid FROM \`${message.author.id}\` WHERE name = ?`)
			let results = test.get(name)
			//if it does, delete it
			if (results !== undefined){
				let char = db.prepare(`DELETE FROM \`${message.author.id}\` WHERE name = ?`)
				char.run(name)
				message.channel.send('Character was deleted.')
			} else {
				message.channel.send(`This character doesn't exist! Did you type their name in correctly?`)
			}
		} catch (error) {
			message.channel.send('We\'ve run into a problem. Try again in a few minutes!');
			console.error(error);
		}
	}
}