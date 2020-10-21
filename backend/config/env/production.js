`use strict`

// TODO
module.exports = {
	session: process.env.SESSION || 'secret-token',
	token: process.env.TOKEN || 'secret-jwt-token',
	database: {
		mongoDbUrl: process.env.MONGODB_URL || 'mongodb+srv://admin:cmpe295dbpassword@development-database.ifuhy.mongodb.net/cmpe295?retryWrites=true&w=majority'
	}
}
