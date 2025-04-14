export interface ICityCreateBodyProps {
  name: string;
}

export interface ICityQueryProps {
  page?: number;
  limit?: number;
  name?: string;
}

export interface ICityParamsProps {
  id?: number;
}
