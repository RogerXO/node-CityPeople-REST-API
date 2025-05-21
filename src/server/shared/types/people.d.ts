import { IPerson } from "../../database/models";

export interface IPersonCreateBodyProps extends Omit<IPerson, "id"> {}

export interface IPersonUpdateBodyProps extends Omit<IPerson, "id"> {}

export interface IpersonQueryProps {
  page?: number;
  limit?: number;
  fullName?: string;
  id?: number;
}

export interface IPersonParamsProps {
  id?: number;
}
