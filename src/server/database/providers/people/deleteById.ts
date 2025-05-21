import { EtableNames } from "../../../shared/enums/ETableNames";
import { Knex } from "../../knex";
import { IPerson } from "../../models";

export async function deleteById(id: number): Promise<void | Error> {
  try {
    const result = await Knex<IPerson>(EtableNames.people)
      .where("id", "=", id)
      .del();

    if (result > 0) return;

    return new Error("Erro ao deletar pessoa");
  } catch (error) {
    console.log(error);
    return new Error("Erro ao deletar pessoa no banco de dados");
  }
}
