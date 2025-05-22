import { IPerson } from "../../database/models";

export interface IPersonCreateBodyProps extends Omit<IPerson, "id"> {}

export interface IPersonUpdateBodyProps extends Omit<IPerson, "id"> {}

export interface IPersonQueryProps {
  page?: number;
  limit?: number;
  nameFilter?: string;
}

export interface IPersonParamsProps {
  id?: number;
}
