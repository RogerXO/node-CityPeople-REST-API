import * as signIn from "./signIn"
import * as signUp from "./signUp"

export const usersController = {
  ...signIn,
  ...signUp
} 