module.exports.indexController = (application, req, res) => {
    res.render('index',{validacao: {}});
}

module.exports.autenticar = (application, req, res) => {
    
    var dadosForm = req.body;

    req.assert('usuario','Usuário é Obrigatório').notEmpty();
    req.assert('senha','Senha é Obrigatório').notEmpty();
    
    var errors = req.validationErrors();

    if(errors){
        res.render('index',{validacao: errors});
        return;
    }

    var connection  = application.config.dbConnection;
    var usuariosDAO = new application.app.models.UsuariosDAO(connection);

    usuariosDAO.autenticar(dadosForm,req,res);
   
}