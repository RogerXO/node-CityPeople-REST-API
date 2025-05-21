import { EtableNames } from "../../../shared/enums/ETableNames";
import { Knex } from "../../knex";
import { IPerson } from "../../models";

export async function count(nameFilter: string): Promise<number | Error> {
  try {
    const [{ count }] = await Knex<IPerson>(EtableNames.people)
      .where("fullName", "like", `%${nameFilter}%`)
      .count<[{ count: number }]>("* as count");

    if (Number.isInteger(Number(count))) return Number(count);

    return new Error(
      "Erro ao consultar a quantidade total de pessoas registradas"
    );
  } catch (error) {
    console.log(error);
    return new Error(
      "Erro ao consultar a quantidade total de pessoas no banco de dados"
    );
  }
}
