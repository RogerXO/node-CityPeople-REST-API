import { EtableNames } from "../../../shared/enums/ETableNames";
import { Knex } from "../../knex";
import { ICidade } from "../../models";

export async function getAll(
  page: number,
  limit: number,
  filterName: string,
  id = 0
): Promise<ICidade[] | Error> {
  try {
    const results = await Knex<ICidade>(EtableNames.cities)
      .select("*")
      .where("id", Number(id))
      .orWhere("name", "like", `%${filterName}%`)
      .offset((page - 1) * limit)
      .limit(limit);

    if (id > 0 && results.every((city) => city.id !== id)) {
      const resultById = await Knex<ICidade>(EtableNames.cities)
        .select("*")
        .where("id", "=", Number(id))
        .first();

      if (resultById) return [...results, resultById];
    }

    return results;
  } catch (error) {
    console.log(error);
    return new Error("Erro ao carregar cidades");
  }
}
