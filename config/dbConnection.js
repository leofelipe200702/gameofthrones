/* importar o mongodb */
var mongo = require('mongodb');

var connMongoDB = () =>{
	var db = new mongo.Db(
		'got',
		new mongo.Server(
			'localhost', //string contendo o endereço do servidor
			27017, //porta de conexão
			{}
		),
		{}
	);

	return db;
}

module.exports = () =>{
	return connMongoDB;
}