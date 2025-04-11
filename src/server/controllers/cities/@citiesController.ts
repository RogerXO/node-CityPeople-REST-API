import * as create from "./create";
import * as getAll from "./getAll"

export const citiesController = {
  ...create,
  ...getAll
}