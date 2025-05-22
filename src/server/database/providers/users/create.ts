import { ETableNames } from "../../../shared/enums/ETableNames";
import { IUserSignUpBodyProps } from "../../../shared/types/users";
import { Knex } from "../../knex";

export async function create(
  user: IUserSignUpBodyProps
): Promise<number | Error> {
  try {
    const [result] = await Knex(ETableNames.users).insert(user).returning("id");

    if (result.id) return result.id;

    return new Error("Erro ao cadastrar usuário");
  } catch (error) {
    console.log(error);
    return new Error("Erro ao criar usuário no banco de dados");
  }
}
