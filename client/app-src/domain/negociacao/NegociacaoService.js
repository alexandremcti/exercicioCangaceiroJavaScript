import { Negociacao } from "./Negociacao.js";
import { AplicationException, HttpService  } from "../../util/index.js";

export class NegociacaoService {

    constructor(){
        this._http = new HttpService();
    }

    obterNegociacoesDaSemana() {
        return this._http
            .get(`${SERVICE_URL}/negociacoes/semana`)
            .then( dados => dados.map(objeto => new Negociacao(new Date(objeto.data), objeto.quantidade, objeto.valor)),
            error => { 
                throw new AplicationException('Não foi possível obter negociações da semana'); 
            });
    }

    obterNegociacoesDaSemanaAnterior() { 
        return this._http
        .get(`${SERVICE_URL}/negociacoes/anterior`)
        .then( dados => dados.map(objeto => new Negociacao(new Date(objeto.data), objeto.quantidade, objeto.valor)),
        error => { 
            throw new AplicationException('Não foi possível obter negociações da semana anterior'); 
        });
    }


    obterNegociacoesDaSemanaRetrasada() {
        return this._http
        .get(`${SERVICE_URL}/negociacoes/retrasada`)
        .then( dados => dados.map(objeto => new Negociacao(new Date(objeto.data), objeto.quantidade, objeto.valor)),
        error => { 
            throw new AplicationException('Não foi possível obter negociações da semana retrasada'); 
        }); 
    }

    async obterNegociacoesDoPeriodo() {
        try {
            let periodo = await Promise.all([
                this.obterNegociacoesDaSemana(),
                this.obterNegociacoesDaSemanaAnterior(),
                this.obterNegociacoesDaSemanaRetrasada()
            ])
            return periodo
                .reduce((novoArray, valor) => novoArray.concat(valor), [])
                .sort((a,b) => b.data.getTime() - a.data.getTime())
        } catch (error) {
            console.log(error);
            throw new AplicationException('Não foi possível obter negociaões do período'); 
        }
    }

}