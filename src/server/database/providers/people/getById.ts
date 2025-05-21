import { EtableNames } from "../../../shared/enums/ETableNames";
import { Knex } from "../../knex";
import { IPerson } from "../../models";

export async function getById(id: number): Promise<IPerson | Error> {
  try {
    const result = await Knex<IPerson>(EtableNames.people)
      .select("*")
      .where("id", "=", id)
      .first();

    if (result) return result;

    return new Error("Pessoa não encontrada");
  } catch (error) {
    console.log(error);
    return new Error(
      "Erro ao consultar por esta esta pessoa no banco de dados"
    );
  }
}
