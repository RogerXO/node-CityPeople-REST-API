import { ICityParamsProps } from "../../../shared/types/cities.models";
import { EtableNames } from "../../ETableNames";
import { Knex } from "../../knex";
import { ICidade } from "../../models";

export async function getById(cityId: number): Promise<ICidade | Error> {
  try {
    const result = await Knex<ICidade>(EtableNames.cidades)
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
