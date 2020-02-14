module.exports.cadastroController = (application, re, res) => {
    res.render('cadastro',{validacao: {},dadosForm: {}});
}

module.exports.cadastrar =  (application, req, res) => {

    var dadosForm = req.body;
    req.assert('nome', 'O Nome é obrigatório!').notEmpty();
    req.assert('usuario', 'O Usuário é obrigatório!').notEmpty();
    req.assert('senha', 'A Senha é obrigatória!').notEmpty();
    req.assert('casa', 'A Casa é obrigatória!').notEmpty();

    var errors = req.validationErrors();

    if (errors) {
        res.render('cadastro',{validacao: errors,dadosForm: dadosForm});
        return;
    }

    var connection = application.config.dbConnection;
    var UsuarioDAO = new application.app.models.UsuariosDAO(connection);
    var JogoDAO = new application.app.models.JogoDAO(connection);

    UsuarioDAO.inserirUsuario(dadosForm);
    JogoDAO.gerarParametros(dadosForm.usuario);
    
}