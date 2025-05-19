import { EtableNames } from "../../ETableNames";
import { Knex } from "../../knex";
import { ICidade } from "../../models";

export async function getAll(): Promise<ICidade[] | Error> {
  try {
    const result = await Knex.select().from<ICidade>(EtableNames.cidades);

    if (result.length) return result;
    else
      return new Error(
        "Erro ao requisitar todas as cidades para o banco de dados"
      );
  } catch (error) {
    console.log(error);
    return new Error("Erro na requisição de cidades para o banco de dados");
  }
}
