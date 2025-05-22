import * as create from "./create";
import * as getByEmail from "./getByEmail";

export const usersProvider = {
  ...create,
  ...getByEmail,
};
