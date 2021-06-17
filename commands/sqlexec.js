module.exports = {
	help: "Execute an arbitrary SQL command.",
	usage: "sqlexec <SQL query>",
	run(client, message, args) {
		/*try {
			let execOutput = client.db.exec(args.join(' '));
			message.channel.send('Executed. If you fucked up... yeah. Don\'t.');
			message.channel.send(execOutput)
		} catch (error) {
			message.channel.send(`ERROR: ${error}`)
		}
		*/
		message.channel.send('Hahaha *fuck you*.')
	}
}