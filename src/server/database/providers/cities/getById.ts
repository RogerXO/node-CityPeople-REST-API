import { ETableNames } from "../../../shared/enums/ETableNames";
import { Knex } from "../../knex";
import { ICity } from "../../models";

export async function getById(cityId: number): Promise<ICity | Error> {
  try {
    const result = await Knex(ETableNames.cities)
      .select("*")
      .where("id", "=", cityId)
      .first();

    if (result) return result;

    return new Error("Cidade não encontrada");
  } catch (error) {
    console.log(error);
    return new Error("Erro ao procurar por esta cidade no banco de dados");
  }
}
