const api = require('../api');

module.exports = function(app){
    app.route('/negociacoees/semana')
        .get(api.listaSemana);

    app.route('/negociacoes/anterior')
        .get(api.listaAnterior);
    
    app.route('/negociacoes/retrasada')
        .get(api.listaRetrasada);
    
    app.route('/negociacoes')
        .get(api.cadastraNegociacao);
}