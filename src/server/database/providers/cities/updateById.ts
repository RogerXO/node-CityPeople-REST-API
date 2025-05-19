import { ICityUpdateBodyProps } from "../../../shared/types/cities.models";
import { EtableNames } from "../../ETableNames";
import { Knex } from "../../knex";

export async function updateById(
  cityId: number,
  data: ICityUpdateBodyProps
): Promise<number | Error> {
  try {
    const result = await Knex(EtableNames.cidades)
      .where("id", cityId)
      .update(data);

    if (typeof result === "number") return result;

    return new Error("Erro ao atualizar cidade inexistente");
  } catch (error) {
    console.log(error);
    return new Error("Erro ao atualizar cidade");
  }
}
