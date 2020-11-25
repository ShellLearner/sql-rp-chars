module.exports = {
	name: 'reload',
	help: 'It reloads a command.',
	run(client, message, args){
		let item = args[0]
		if (client.commands.has(item)){
			delete require.cache[require.resolve(`../commands/${item}.js`)];
			let commandf = require(`../commands/${item}`);
			let cname = item.split('.')[0];
			console.log(`Reloading ${cname}`);
			client.commands.set(cname, commandf);
			message.channel.send(`Command ${cname} has been reloaded!`)
		} else {
			message.channel.send('That command doesn\'t exist!')
			console.log(`Attempted to reload ${item}`)
		}
	}
}