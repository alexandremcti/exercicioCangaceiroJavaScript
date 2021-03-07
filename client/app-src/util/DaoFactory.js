import { NegociacaoDao } from "../domain/negociacao/NegociacaoDao.js";
import { ConnectionFactory } from "./ConnectionFactory.js";

export async function getNegociacaoDao(){
    const connection = await ConnectionFactory.getConnection();
    return new NegociacaoDao(connection);
}
