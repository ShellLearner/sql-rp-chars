let { create } = require('../resources/tableprereq.js')

module.exports = (client, message) => {

	if (!message.author.bot && message.content.startsWith(process.env.PREFIX)) {
		//turns all slanted quotes into straight quotes
		message.content = message.content.replace(/\u201d|\u201c/g, '"')
		//splits the commands from the argument
		const args = message.content.slice(process.env.PREFIX.length).trim().split(/ +/g);
		const command = args.shift().toLowerCase();

		//loading in the command
		const cmd = client.commands.get(command)

		if (!cmd) return;
		try {
			if (cmd.prereqs === undefined) {
				cmd.run(client, message, args);
			} else if (cmd.prereqs.includes('table')) {
				create(client, message)
				cmd.run(client, message, args);
			}
		} catch (err) {
			message.channel.send('Something\'s gone very wrong. This error has been reported to the devs.')
			console.error(err)
		}
	}
}
