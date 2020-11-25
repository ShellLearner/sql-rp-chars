module.exports = (client, message) => {

	if (!message.author.bot && message.content.startsWith(process.env.PREFIX)) {

		//splits the commands from the argument
		const args = message.content.slice(process.env.PREFIX.length).trim().split(/ +/g);
		const command = args.shift().toLowerCase();

		//loading in the command
		const cmd = client.commands.get(command)

		if (!cmd) return;
		cmd.run(client, message, args);
	}
}
