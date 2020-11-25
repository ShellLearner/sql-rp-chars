const { MessageEmbed } = require("discord.js");

module.exports = {
	name: 'help',
	help: 'It shows help pages. Pretty simple.',
	usage: 'help [command name]',
	run(client, message, args){

		if (args.length === 0) {
			//If nothing exists, send a list of commands
			
			//first, create a list of commands from the client.commands map
			let commandlist = new Array()
			const cmditer = client.commands.keys();
			for (const element of cmditer){
				commandlist.push(element);
			}
			
			//then send the list
			message.channel.send(`Our current commands are ${commandlist.join(', ')}.`);
			//and be done with it
			return;
		}
	
		if (client.commands.has(args[0])) {
			//if the command exists, get the corresponding export from the client.commands map
			const cmd = client.commands.get(args[0])
			//TODO: construct messageEmbed from command information
	
			if (!cmd.help) {
				//if the command doesn't have a help page, say so
				message.channel.send('We don\'t have a help page quite yet for this command. Sorry!');
				return;
			}
	
			//create an embed with all the help information
			let helpEmbed = new MessageEmbed()
				.setTitle(args[0])
				.setDescription(cmd.help)
			message.channel.send(helpEmbed)
	
		} else {
			//if the command doesn't exist, say so
			message.channel.send('That command doesn\'t exist!');
		}
	}
}