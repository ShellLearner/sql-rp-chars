module.exports = {
	help: 'Edits a part of your character.',
	usage: 'edit <characterID> <attribute> <new value>',
	prereqs: ['table'],
	run(client, message, args) {
		//check if database connection exists
		if (!client.db){
			message.channel.send('WARNING: DATABASE CONNECTION DOES NOT EXIST OR WAS CLOSED. DO NOT CONTINUE.');
			return;
		} else {
			db = client.db
		}
		if (!isNaN(args[0])){
			try {
				let charid = Number(args.shift());
				let results = db.prepare(`SELECT * FROM \`${message.author.id}\` WHERE charid = ?;`).get(charid)
				if (results === undefined){
					message.channel.send('This character doesn\'t exist!');
					return;
				} else if (results.hasOwnProperty(args[0])){
					let attribute = args.shift();
					let newValue = args.join(' ');
					db.prepare(`UPDATE \`${message.author.id}\` SET ${attribute} = ? WHERE charid = ?`).run(newValue, charid);
					message.channel.send('Character updated!')
				} else message.channel.send('This parameter doesn\'t exist!')	
			} catch (error) {
				console.error(error);
				message.channel.send('An SQLite error has occured. Check the console for details.')
			}
		}
		/*//find out constraints through this very lengthy process
		let constraints = db.prepare(`SELECT sql FROM sqlite_master WHERE name = '${message.author.id}'`).all()[0].sql.split(/ +/g)
		constraints.forEach((element, index) => {
			constraints[index] = element.trim().toLowerCase()
		});
		*/
	}
}