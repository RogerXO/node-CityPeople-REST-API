import { ICity, IPerson, IUser } from "../../models";

declare module "knex/types/tables" {
  interface Tables {
    cities: ICity;
    people: IPerson;
    users: IUser;
  }
}
