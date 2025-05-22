import { ETableNames } from "../../../shared/enums/ETableNames";
import { utils } from "../../../shared/services";
import { Knex } from "../../knex";
import { IPerson } from "../../models";

export async function getAll(
  page = utils.defaultPage,
  limit = utils.defaultLimit,
  nameFilter: string
): Promise<IPerson[] | Error> {
  try {
    const results = await Knex(ETableNames.people)
      .select("*")
      .where("fullName", "like", `%${nameFilter}%`)
      .offset((page - 1) * limit)
      .limit(limit);

    return results;
  } catch (error) {
    console.log(error);
    return new Error("Erro ao carregar pessoas");
  }
}
