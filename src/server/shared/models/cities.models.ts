export interface CreateCityBody {
  name: string;
}

export interface CityQueryProps {
  page?: number;
  limit?: number;
  name?: string;
}
