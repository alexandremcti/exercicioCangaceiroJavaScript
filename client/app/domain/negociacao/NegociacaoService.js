class NegociacaoService {

    obterNegociacoesDaSemana(callback) {
        let xhr = new XMLHttpRequest();
        xhr.open('GET', 'negociacoes/semana');
        xhr.onreadystatechange = () => {
            if(xhr.readyState == 4){
                if(xhr.status == 200) {

                    const negociacoes = JSON.parse(xhr.responseText)
                                            .map(objeto => new Negociacao(new Date(objeto.data), objeto.quantidade, objeto.valor));
                    return callback(null, negociacoes);               
                }else{
                    return callback('Não foi possível obter negociações da semana', null);
                }
            }
        }
        xhr.send();
    }

}