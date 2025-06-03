import bcrypt from "bcryptjs";
import prisma from "../config/prisma";
import { generateToken } from "../utils/jwt";

/**
 * Registers a new user in the system.
 * - Hashes the password before storing it.
 * - Generates a JWT token for authentication.
 *
 * @param {string} email - User's email (must be unique).
 * @param {string} password - Plain text password (will be hashed).
 * @param {string} [name] - Optional user name.
 * @returns {Promise<{user: User, token: string}>} Object with the created user and their JWT token.
 * @throws {Error} If the email is already registered.
 */
export async function registerUser(
  email: string,
  password: string,
  name?: string
) {
  const existingUser = await prisma.user.findUnique({ where: { email } });
  if (existingUser) {
    throw new Error("User already exists");
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await prisma.user.create({
    data: {
      email,
      password: hashedPassword,
      name,
    },
  });

  const token = generateToken({ userId: user.id });

  return { user, token };
}

/**
 * Authenticates an existing user.
 * - Compares the provided password to the stored hash.
 * - Generates a JWT token if the credentials are valid.
 *
 * @param {string} email - The user's email address.
 * @param {string} password - The plaintext password.
 * @returns {Promise<{user: User, token: string}>} An object containing the user and their JWT token.
 * @throws {Error} If the user doesn't exist or the password is incorrect.
 */
export async function loginUser(email: string, password: string) {
  const user = await prisma.user.findUnique({ where: { email } });

  if (!user) {
    throw new Error("User not found");
  }

  const isPasswordValid = await bcrypt.compare(password, user.password);

  if (!isPasswordValid) {
    throw new Error("Invalid password");
  }

  const token = generateToken({ userId: user.id });

  return { user, token };
}

/**
 * Logs the user out (mock).
 * Note: In a real-world implementation, this would invalidate the JWT token.
 *
 * @param {string} token - JWT token to invalidate (not implemented in this example).
 * @returns {Promise<{success: boolean}>} Always returns `{success: true}` (mock).
 */
export async function logoutUser(token: string) {
  return { success: true };
}
