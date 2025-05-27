import { ETableNames } from "../../../shared/enums/ETableNames";
import { Knex } from "../../knex";
import { IUser } from "../../models";

export async function getByEmail(email: string): Promise<IUser | Error> {
  try {
    const result = await Knex(ETableNames.users)
      .select("*")
      .where("email", email)
      .first();

    if (result) return result;

    return new Error("Usuário não encontrado");
  } catch (error) {
    console.log(error);
    return new Error("Erro ao consultar o usuário");
  }
}
