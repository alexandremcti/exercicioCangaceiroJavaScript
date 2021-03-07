import {obrigatorio} from '../../util/index.js';

export class Negociacao {
    constructor(_data = obrigatorio('data'), _quantidade = obrigatorio('quantidade'), _valor = obrigatorio('valor')) {
        //utilizando literal objects
        Object.assign(this,{_quantidade, _valor});
        this._data = new Date(_data.getTime());
        Object.freeze(this);
    }

    get data() {
        return  this._data;
    }

    get quantidade() {
        return this._quantidade;
    }

    get valor() {
        return this._valor;
    }

    get volume() {
        return this._quantidade * this._valor;
    }

    equals(Negociacao) {
        return JSON.stringify(this) == JSON.stringify(Negociacao);
    }
}