const ConnectionFactory = (() => {
    const stores = ['negociacoes'];
    let connection = null;
    let close = null;

    return class ConnectionFactory {
        constructor(){
            throw new Error('Não é possível criar instâncias dessa classe');
        }

        static getConnection() {
            return new Promise((resolve, reject) => {

                if(connection) return resolve(connection);

                const openRequest = indexedDB.open('jscangaceiro', 2);
                
                openRequest.onupgradeneeded = e => {
                    console.log('Conexão criada com sucesso');
                    ConnectionFactory._createStores(e.target.result);
                };

                openRequest.onsuccess = e => {
                    connection = e.target.result;
                    console.log('Conexão salva com sucesso');
                    close = connection.close.bind(connection);
                    connection.close = () => {

                        throw new Error('Não é possível fechar a conexão diretamente. Execute ConnectionFactory.closeConnection()');
                    }
                    resolve(connection);
                };

                openRequest.onerror = e => {
                    console.log(e.target.error);
                    reject(e.target.error.name);
                };


            });
        }

        static _createStores(connection){
            stores.forEach(store => {
                if(connection.objectStoreNames.contains(store)){
                    connection.deleteObjectStore(store);
                }
                connection.createObjectStore(store, {autoIncrement: true});
            })
        }

        static closeConnection() {
            if(connection){
                close();
                console.log('Conexão fechada com sucesso');
            }

        }
    }
})()