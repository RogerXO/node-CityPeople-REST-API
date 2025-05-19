import { EtableNames } from "../../../shared/enums/ETableNames";
import { Knex } from "../../knex";
import { ICidade } from "../../models";

export async function count(filter = "") {
  try {
    const [{ count }] = await Knex<ICidade>(EtableNames.cities)
      .where("name", "like", `%${filter}%`)
      .count<[{ count: number }]>("* as count");

    if (Number.isInteger(Number(count))) return Number(count);

    return new Error(
      "Erro ao consultar a quantidade total de cidades registradas"
    );
  } catch (error) {
    console.log(error);
    return new Error("Erro ao consultar a quantidade total de registros");
  }
}
