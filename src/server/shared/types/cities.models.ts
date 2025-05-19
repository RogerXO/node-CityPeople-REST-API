import { Extension } from "typescript";
import { ICidade } from "../../database/models";

export interface ICityCreateBodyProps extends Omit<ICidade, "id"> {}

export interface ICityUpdateBodyProps extends Omit<ICidade, "id"> {}

export interface ICityQueryProps {
  page?: number;
  limit?: number;
  filter?: string;
  id?: number
}

export interface ICityParamsProps {
  id?: number;
}
