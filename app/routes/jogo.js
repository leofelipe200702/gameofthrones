module.exports = (application) =>{
	application.get('/jogo', (req, res) =>{
		application.app.controllers.jogo.jogoController(application,req,res);
	});

	application.get('/sair', (req, res) =>{
		application.app.controllers.jogo.sair(application,req,res);
	});

	application.get('/suditos', (req, res) =>{
		application.app.controllers.jogo.suditos(application,req,res);
	});

	application.get('/pergaminhos', (req, res) =>{
		application.app.controllers.jogo.pergaminhos(application,req,res);
	});

	application.post('/orderAcaoSudito', (req, res) =>{
		application.app.controllers.jogo.orderAcaoSudito(application,req,res);
	});

	application.get('/revogarOrder', (req, res) =>{
		application.app.controllers.jogo.revogarOrder(application,req,res);
	});
}