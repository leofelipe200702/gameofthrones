var ObjectID = require('mongodb').ObjectId;

function JogoDAO(connection) {
	this._connection = connection();
}

JogoDAO.prototype.gerarParametros = function (usuario) {
	this._connection.open(function (err, mongoclient) {
		mongoclient.collection("jogo", function (err, collection) {
			collection.insert({
				usuario: usuario,
				moeda: 15,
				suditos: 10,
				temor: Math.floor(Math.random() * 1000),
				sabedoria: Math.floor(Math.random() * 1000),
				comercio: Math.floor(Math.random() * 1000),
				magia: Math.floor(Math.random() * 1000)
			});
			mongoclient.close();
		});
	});
}

JogoDAO.prototype.armazenarAcao = function (dadosForm) {
	this._connection.open(function (err, mongoclient) {
		mongoclient.collection("acao", function (err, collection) {

			var date = new Date();
			var tempoAcao = null;
			switch (parseInt(dadosForm.acaoSudito)) {
				case 1: tempoAcao = 1 * 60 * 60000; break;
				case 2: tempoAcao = 2 * 60 * 60000; break;
				case 3: tempoAcao = 5 * 60 * 60000; break;
				case 4: tempoAcao = 5 * 60 * 60000;
			}

			dadosForm.timeOutAcao = date.getTime() + tempoAcao;

			collection.insert(dadosForm);

		});

		mongoclient.collection("jogo", function (err, collection) {

			var moedas = null;

			switch (parseInt(dadosForm.acaoSudito)) {
				case 1: moedas = -2 * dadosForm.qtdAcaoSudito; break;
				case 2: moedas = -3 * dadosForm.qtdAcaoSudito; break;
				case 3: moedas = -1 * dadosForm.qtdAcaoSudito; break;
				case 4: moedas = -1 * dadosForm.qtdAcaoSudito;
			}

			//atualizando o valor das moedas
			collection.update(
				{ usuario: dadosForm.usuario },
				{ $inc: { moeda: moedas } }
			);

			mongoclient.close();
		});
	});
}

JogoDAO.prototype.revogarOrder = function (idOrder,res) {
	this._connection.open(function (err, mongoclient) {
		mongoclient.collection("acao", function (err, collection) {
			collection.remove(
				{_id: ObjectID(idOrder)},
				function (err,result){
					res.redirect('jogo?errors=D');
					mongoclient.close();
				}

			);

		});
	});

}


JogoDAO.prototype.iniciaJogo = function (usuario, casa, res, errors) {
	this._connection.open(function (err, mongoclient) {
		mongoclient.collection("jogo", function (err, collection) {
			collection.find({ usuario: usuario }).toArray(function (err, result) {
				res.render('jogo', { imgCasa: casa, dadosJogo: result[0], errors: errors });
			});
			mongoclient.close();
		});
	});
}

JogoDAO.prototype.getAcoes = function (usuario, res) {
	this._connection.open(function (err, mongoclient) {
		mongoclient.collection("acao", function (err, collection) {
			var date = new Date();
			var dateAtual = date.getTime();

			collection.find({ usuario: usuario, timeOutAcao: { $gt: dateAtual } }).toArray(function (err, result) {
				res.render('pergaminhos', { acoes: result });
			});
			mongoclient.close();
		});
	});
}

module.exports = function () {
	return JogoDAO;
}