module.exports = {
	create(client, message){
		if (!client.db){
			return;
		}
		createTable = `CREATE TABLE IF NOT EXISTS \`${message.author.id}\` (
			charid INTEGER PRIMARY KEY AUTOINCREMENT,
			name STRING NOT NULL,
			age INTEGER NOT NULL,
			ultimate STRING,
			personality STRING,
			gender STRING
			);`
		client.db.exec(createTable)
	} 
}