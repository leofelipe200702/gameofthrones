module.exports.jogoController = (application, req, res) => {

    if (req.session.autorizado != true) {
        res.send('Usuário precisa fazer login!');
        return;
    }
    var errors = '';

    if (req.query.errors == 'S') {
        errors = 'S';
    }

    if (req.query.errors == 'F') {
        errors = 'F';
    }

    if (req.query.errors == 'D') {
        errors = 'D';
    }
    var connection = application.config.dbConnection;
    var JogoDAO = new application.app.models.JogoDAO(connection);
    var usuario = req.session.usuario;
    var casa = req.session.casa;

    JogoDAO.iniciaJogo(usuario, casa, res,errors);
}

module.exports.sair = (application, req, res) => {
    req.session.destroy(function (err) {
        res.render('index', { validacao: {} });
    });
}

module.exports.suditos = (application, req, res) => {
    if (req.session.autorizado != true) {
        res.send('Usuário precisa fazer login!');
        return;
    }
    res.render('aldeoes');
}

module.exports.pergaminhos = (application, req, res) => {
    if (req.session.autorizado != true) {
        res.send('Usuário precisa fazer login!');
        return;
    }

    var connection = application.config.dbConnection;
    var JogoDAO = new application.app.models.JogoDAO(connection);
    var usuario = req.session.usuario;

    JogoDAO.getAcoes(usuario,res);
}

module.exports.orderAcaoSudito = (application, req, res) => {

    if (req.session.autorizado != true) {
        res.send('Usuário precisa fazer login!');
        return;
    }
    
    var dadosForm = req.body;

    req.assert('acaoSudito', 'A ação é obrigatória!').notEmpty();
    req.assert('qtdAcaoSudito', 'A quantidade da ação é obrigatória!').notEmpty();

    var errors = req.validationErrors();

    if (errors) {
        res.redirect('jogo?errors=S');
        return;
    }

    var connection = application.config.dbConnection;
    var JogoDAO = new application.app.models.JogoDAO(connection);

    dadosForm.usuario = req.session.usuario;
    JogoDAO.armazenarAcao(dadosForm);

    res.redirect('jogo?errors=N');
}

module.exports.revogarOrder = (application, req, res) => {
    var idOrder = req.query.idOrder;
    
    var connection = application.config.dbConnection;
    var JogoDAO = new application.app.models.JogoDAO(connection);
    JogoDAO.revogarOrder(idOrder,res);    
}
