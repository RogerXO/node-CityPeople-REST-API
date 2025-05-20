import { ICityParamsProps } from "../../../shared/types/cities.models";
import { EtableNames } from "../../../shared/enums/ETableNames";
import { Knex } from "../../knex";
import { ICity } from "../../models";

export async function getById(cityId: number): Promise<ICity | Error> {
  try {
    const result = await Knex<ICity>(EtableNames.cities)
      .select("*")
      .where("id", "=", cityId)
      .first();

    if (result) return result;

    return new Error("Esta cidade não existe no Banco de dados");
  } catch (error) {
    console.log(error);
    return new Error("Não foi possível encontrar esta cidade");
  }
}
