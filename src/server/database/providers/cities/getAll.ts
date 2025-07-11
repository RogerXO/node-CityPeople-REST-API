import { ETableNames } from "../../../shared/enums/ETableNames";
import { utils } from "../../../shared/services";
import { Knex } from "../../knex";
import { ICity } from "../../models";

export async function getAll(
  page = utils.defaultPage,
  limit = utils.defaultLimit,
  filterName: string,
  id = 0
): Promise<ICity[] | Error> {
  try {
    const results = await Knex(ETableNames.cities)
      .select("*")
      .where("id", Number(id))
      .orWhere("name", "like", `%${filterName}%`)
      .offset((page - 1) * limit)
      .limit(limit);

    if (id > 0 && results.every((city) => city.id !== id)) {
      const resultById = await Knex(ETableNames.cities)
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
