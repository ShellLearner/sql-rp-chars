const sqlite = require('better-sqlite3');
const db = new sqlite('./database/users.db');

module.exports = (client) => {
	console.log(`Serving in ${client.guilds.size} servers with a total of ${client.users.size} users.`);
	client.db = db;
	db.defaultSafeIntegers();
}