import { EtableNames } from "../../../shared/enums/ETableNames";
import { IPersonCreateBodyProps } from "../../../shared/types/people";
import { Knex } from "../../knex";
import { ICity, IPerson } from "../../models";

export async function create(
  person: IPersonCreateBodyProps
): Promise<number | Error> {
  try {
    const [{ count }] = await Knex<ICity>(EtableNames.cities)
      .where("id", "=", person.cityId)
      .count<[{ count: number }]>("* as count");

    if (count === 0)
      return new Error("A cidade usada no cadastro não foi encontrada");

    const [result] = await Knex<IPerson>(EtableNames.people)
      .insert(person)
      .returning("id");

    if (result.id) return result.id;

    return new Error("Erro ao cadastrar pessoa");
  } catch (error) {
    console.log(error);
    return new Error("Erro ao criar pessoa no banco de dados");
  }
}
