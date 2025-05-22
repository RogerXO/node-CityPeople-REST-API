import { ICityUpdateBodyProps } from "../../../shared/types/cities";
import { ETableNames } from "../../../shared/enums/ETableNames";
import { Knex } from "../../knex";

export async function updateById(
  cityId: number,
  data: ICityUpdateBodyProps
): Promise<void | Error> {
  try {
    const result = await Knex(ETableNames.cities)
      .where("id", cityId)
      .update(data);

    if (result > 0) return;

    return new Error("Erro ao atualizar cidade inexistente");
  } catch (error) {
    console.log(error);
    return new Error("Erro ao atualizar cidade");
  }
}
