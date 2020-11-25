module.exports = {
	name: "create",
	help: "It creates a character.",
	usage: "create [who knows]",
	prereqs: ["none"],
	run(client, message, args) {
		//make sure the args are actually usable
		let name = args[0]
		let age = Number(args[1])
		if (isNaN(age)) {
			message.channel.send('Uhh... try putting in an actual number. Note: this bot only accepts a first name as a name.')
			return;
		}

		//check if database exists
		if (!client.db){
			message.channel.send('WARNING: DATABASE CONNECTION DOES NOT EXIST. DO NOT CONTINUE.');
			return;
		} else {
			db = client.db
		}

		//create a user table if it doesn't exist
		createTable = `CREATE TABLE IF NOT EXISTS \`${message.author.id}\` (
		charid INTEGER PRIMARY KEY AUTOINCREMENT,
		name STRING NOT NULL,
		age INTEGER NOT NULL,
		personality STRING
		);`
		db.exec(createTable)

		//create the character row
		try {
			let test = db.prepare(`SELECT charid FROM \`${message.author.id}\` WHERE name = ?`)
			let results = test.get(name)
			if (results.charid === undefined){
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