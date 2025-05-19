import { ICityParamsProps } from "../../../shared/types/cities.models";
import { EtableNames } from "../../ETableNames";
import { Knex } from "../../knex";

export async function deleteById(
  city: ICityParamsProps
): Promise<number | Error> {
  try {
    const result = await Knex(EtableNames.cidades).where("id", city.id).del();
    console.log(result);
    if (result) return result;
    else return new Error("Erro ao deletar cidade inexistente!");
  } catch (error) {
    console.log(error);
    return new Error("Erro ao deletar cidade!");
  }
}
