import { Extension } from "typescript";
import { ICity } from "../../database/models";

export interface ICityCreateBodyProps extends Omit<ICity, "id"> {}

export interface ICityUpdateBodyProps extends Omit<ICity, "id"> {}

export interface ICityQueryProps {
  page?: number;
  limit?: number;
  filterName?: string;
  id?: number;
}

export interface ICityParamsProps {
  id?: number;
}
