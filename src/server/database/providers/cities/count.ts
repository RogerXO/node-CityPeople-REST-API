import { ETableNames } from "../../../shared/enums/ETableNames";
import { Knex } from "../../knex";

export async function count(filterName = "") {
  try {
    const [{ count }] = await Knex(ETableNames.cities)
      .where("name", "like", `%${filterName}%`)
      .count<[{ count: number }]>("* as count");

    if (Number.isInteger(Number(count))) return Number(count);

    return new Error(
      "Erro ao consultar a quantidade total de cidades registradas"
    );
  } catch (error) {
    console.log(error);
    return new Error(
      "Erro ao consultar a quantidade total de cidades no banco de dados"
    );
  }
}
