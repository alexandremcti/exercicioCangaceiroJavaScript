class NegociacaoService {

    constructor(){
        this._http = new HttpService();
    }

    obterNegociacoesDaSemana() {
        return this._http
            .get('negociacoes/semana')
            .then( dados => dados.map(objeto => new Negociacao(new Date(objeto.data), objeto.quantidade, objeto.valor)),
            error => { 
                throw new Error('Não foi possível obter negociações da semana'); 
            });
    }

    obterNegociacoesDaSemanaAnterior() { 
        return this._http
        .get('negociacoes/anterior')
        .then( dados => dados.map(objeto => new Negociacao(new Date(objeto.data), objeto.quantidade, objeto.valor)),
        error => { 
            throw new Error('Não foi possível obter negociações da semana anterior'); 
        });
    }


    obterNegociacoesDaSemanaRetrasada() {
        return this._http
        .get('negociacoes/retrasada')
        .then( dados => dados.map(objeto => new Negociacao(new Date(objeto.data), objeto.quantidade, objeto.valor)),
        error => { 
            throw new Error('Não foi possível obter negociações da semana retrasada'); 
        }); 
    }

    obterNegociacoesDoPeriodo() {
        return Promise.all([
            this.obterNegociacoesDaSemana(),
            this.obterNegociacoesDaSemanaAnterior(),
            this.obterNegociacoesDaSemanaRetrasada()
        ]).then(
            periodo =>  periodo
                .reduce((novoArray,valor) => novoArray.concat(valor), [])
                .sort((a,b) => b.data.getTime() - a.data.getTime())
        ).catch( error => { 
            console.log(error);
            throw new Error('Não foi possível obter negociaões do período'); 
        });
    }

}