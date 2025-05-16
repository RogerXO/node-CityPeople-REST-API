import { ICidade } from "../../database/models";

export interface ICityCreateBodyProps extends Omit<ICidade, "id"> {}

export interface ICityQueryProps {
  page?: number;
  limit?: number;
  name?: string;
}

export interface ICityParamsProps {
  id?: number;
}
