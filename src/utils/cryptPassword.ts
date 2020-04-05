import { hash, compare } from 'bcrypt';

const hashPassword = async (password: string) =>
  hash(password, parseInt(process.env.PASSWORD_HASHING_ROUNDS, 10));

const comparePasswords = async (
  passwordToVerify: string,
  userRehashedPassword: string
) => compare(passwordToVerify, userRehashedPassword);

export { hashPassword, comparePasswords };
