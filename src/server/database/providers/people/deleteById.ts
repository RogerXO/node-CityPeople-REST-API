import { ETableNames } from "../../../shared/enums/ETableNames";
import { Knex } from "../../knex";

export async function deleteById(id: number): Promise<void | Error> {
  try {
    const result = await Knex(ETableNames.people)
      .where("id", "=", id)
      .del();

    if (result > 0) return;

    return new Error("Erro ao deletar pessoa");
  } catch (error) {
    console.log(error);
    return new Error("Erro ao deletar pessoa no banco de dados");
  }
}
