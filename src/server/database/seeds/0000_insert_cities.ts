import { Knex } from "knex";
import { ETableNames } from "../../shared/enums/ETableNames";

const acreCities = [
  "Acrelândia",
  "Assis Brasil",
  "Brasiléia",
  "Bujari",
  "Capixaba",
  "Cruzeiro do Sul",
  "Epitaciolândia",
  "Feijó",
  "Jordão",
  "Mâncio Lima",
  "Manoel Urbano",
  "Marechal Thaumaturgo",
  "Plácido de Castro",
  "Porto Acre",
  "Porto Walter",
  "Rio Branco",
  "Rodrigues Alves",
  "Santa Rosa do Purus",
  "Sena Madureira",
  "Senador Guiomard",
  "Tarauacá",
  "Xapuri",
];

export async function seed(knex: Knex) {
  const [{ count }] = await knex(ETableNames.cities).count<[{ count: number }]>(
    "* as count"
  );

  if (!Number.isInteger(Number(count)) || Number(count) > 0) return;

  const citiesToInsert = acreCities.map((city) => ({ name: city }));
  await knex(ETableNames.cities).insert(citiesToInsert);
}
