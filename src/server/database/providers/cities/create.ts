import { ICityCreateBodyProps } from "../../../shared/types/cities.models";
import { EtableNames } from "../../../shared/enums/ETableNames";
import { Knex } from "../../knex";

export async function create(
  city: ICityCreateBodyProps
): Promise<number | Error> {
  try {
    const [result] = await Knex(EtableNames.cities)
      .insert(city)
      .returning("id");

    if (typeof result === "object") return result.id;
    else if (typeof result === "number") return result;

    return new Error("Erro ao criar cidade no banco");
  } catch (error) {
    console.log(error);
    return new Error("Erro ao criar cidade no banco");
  }
}
