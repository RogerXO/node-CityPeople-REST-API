import { EtableNames } from "../../../shared/enums/ETableNames";
import { IPersonUpdateBodyProps } from "../../../shared/types/people";
import { Knex } from "../../knex";
import { ICity, IPerson } from "../../models";

export async function updateById(
  personId: number,
  person: IPersonUpdateBodyProps
): Promise<void | Error> {
  try {
    if (person.cityId) {
      const [{ count }] = await Knex<ICity>(EtableNames.cities)
        .where("id", "=", person.cityId)
        .count<[{ count: number }]>("* as count");

      if (count === 0)
        return new Error(
          "A cidade utilizada para atualizar o registro de pessoa não foi encontrada"
        );
    }

    const result = await Knex<IPerson>(EtableNames.people)
      .where("id", "=", personId)
      .update(person);

    if (result > 0) return;

    return new Error("Erro ao atualizar pessoa");
  } catch (error) {
    console.log(error);
    return new Error("Erro ao atualizar pessoa no banco de dados");
  }
}
