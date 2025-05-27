import { compare, genSalt, hash } from "bcryptjs";

const SALT_RANDOMS = 8;

export async function hashPassword(password: string) {
  const salt = await genSalt(SALT_RANDOMS);

  return await hash(password, salt);
}

export async function verifyPassword(password: string, hashPassword: string) {
  return await compare(password, hashPassword);
}
