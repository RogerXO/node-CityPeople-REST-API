import { ICityCreateBodyProps } from "../../../shared/types/cities";
import { EtableNames } from "../../../shared/enums/ETableNames";
import { Knex } from "../../knex";
import { ICity } from "../../models";

export async function create(
  city: ICityCreateBodyProps
): Promise<number | Error> {
  try {
    const [result] = await Knex<ICity>(EtableNames.cities)
      .insert(city)
      .returning("id");

    if (result.id) return result.id;

    return new Error("Erro ao criar cidade no banco");
  } catch (error) {
    console.log(error);
    return new Error("Erro ao criar cidade no banco");
  }
}
