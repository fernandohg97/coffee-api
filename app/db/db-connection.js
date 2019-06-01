const mysql = require('mysql')
const dbOptions = require('./database')

function databaseConnection () {
	const db = mysql.createConnection(dbOptions)

	db.connect(err => {
		if (err) return console.error('There was an error connecting to the database')
		else console.log('Database successfully connected')
	})
	return db
}

module.exports = databaseConnection()
