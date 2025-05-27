import { ETableNames } from "../../../shared/enums/ETableNames";
import { passwordCrypto } from "../../../shared/services";
import { IUserSignUpBodyProps } from "../../../shared/types/users";
import { Knex } from "../../knex";

export async function create(
  user: IUserSignUpBodyProps
): Promise<number | Error> {
  try {
    const hashedPassword = await passwordCrypto.hashPassword(user.password);

    const [result] = await Knex(ETableNames.users)
      .insert({ ...user, password: hashedPassword })
      .returning("id");

    if (result.id) return result.id;

    return new Error("Erro ao cadastrar usuário");
  } catch (error) {
    console.log(error);
    return new Error("Erro ao criar usuário no banco de dados");
  }
}
