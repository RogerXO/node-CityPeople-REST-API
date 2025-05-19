import { ICityParamsProps } from "../../../shared/types/cities.models";
import { EtableNames } from "../../ETableNames";
import { Knex } from "../../knex";
import { ICidade } from "../../models";

export async function getById(
  cityId: number
): Promise<ICidade | Error> {
  try {
    const result = await Knex.select()
      .from<ICidade>(EtableNames.cidades)
      .where("id", cityId);

    if (result.length > 0) return result[0];

    return new Error("Esta cidade não existe no Banco de dados");
  } catch (error) {
    console.log(error);
    return new Error("Não foi possível encontrar esta cidade");
  }
}
