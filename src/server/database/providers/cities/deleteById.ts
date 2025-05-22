import { ETableNames } from "../../../shared/enums/ETableNames";
import { Knex } from "../../knex";

export async function deleteById(cityId: number): Promise<void | Error> {
  try {
    const result = await Knex(ETableNames.cities)
      .where("id", "=", cityId)
      .del();

    if (result > 0) return;

    return new Error("Erro ao deletar cidade inexistente!");
  } catch (error) {
    console.log(error);
    return new Error("Erro ao deletar cidade!");
  }
}
