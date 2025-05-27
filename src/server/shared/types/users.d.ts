import { IUser } from "../../database/models";

export interface IUserSignUpBodyProps extends Omit<IUser, "id"> {}

export interface IUserUpdateBodyProps extends Omit<IUser, "id"> {}

export interface IUserSignInBodyProps extends Omit<IUser, "id" | "name"> {}

export interface IUserQueryProps {
  page?: number;
  limit?: number;
  nameFilter?: string;
}

export interface IUserParamsProps {
  id?: number;
}
