import { ICityCreateBodyProps } from "../../../shared/types/cities";
import { ETableNames } from "../../../shared/enums/ETableNames";
import { Knex } from "../../knex";

export async function create(
  city: ICityCreateBodyProps
): Promise<number | Error> {
  try {
    const [result] = await Knex(ETableNames.cities)
      .insert(city)
      .returning("id");

    if (result.id) return result.id;

    return new Error("Erro ao criar cidade no banco");
  } catch (error) {
    console.log(error);
    return new Error("Erro ao criar cidade no banco");
  }
}
