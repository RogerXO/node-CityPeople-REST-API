import { IUser } from "../../database/models";

export interface IUserCreateBodyProps extends Omit<IUser, "id"> {}

export interface IUserUpdateBodyProps extends Omit<IUser, "id"> {}

export interface IUserQueryProps {
  page?: number;
  limit?: number;
  nameFilter?: string;
}

export interface IUserParamsProps {
  id?: number;
}
