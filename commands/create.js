module.exports = {
	help: "It creates a character.",
	usage: "create <name> <age>",
	prereqs: ["table"],
	run(client, message, args) {
		
		//make sure the args are actually usable
		let name;
		let age;
		let userInput = args.join(" ").split('"')
		if (message.content.includes('"') && userInput.length <= 2) {
			message.channel.send('Not enough arguments! Are you missing a closing quote?');
			return;
		} else if (args.length < 2) {
			message.channel.send('Not enough arguments! Did you forget to add an age value?');
			return;
		}

		if (message.content.includes('"')){ 
			name = userInput[1]
			age = Number(userInput[2].trim())
		} else {
			name = args[0]
			age = Number(args[1])
		}

		//check if database connection exists
		if (!client.db){
			message.channel.send('WARNING: DATABASE CONNECTION DOES NOT EXIST OR WAS CLOSED. DO NOT CONTINUE.');
			return;
		} else {
			db = client.db
		}

		if (isNaN(age)) {
			message.channel.send('Your age isn\'t usable. Did you forget to "quote" your name?')
			return;
		}

		//create the character row
		try {
			let test = db.prepare(`SELECT charid FROM \`${message.author.id}\` WHERE name = ?`)
			let results = test.get(name)
			if (results === undefined){
				let char = db.prepare(`INSERT INTO \`${message.author.id}\` (name, age) VALUES (?, ?)`)
				char.run(name, age)
				message.channel.send('Character created!')
			} else {
				message.channel.send(`This character exists already, their ID is ${results.charid}`)
			}
		} catch (error) {
			message.channel.send('We\'ve run into a problem. Try again in a few minutes!');
			console.error(error);
		}
	}
}