import { AppDataSource } from "../config/db";
import { User } from "../models/User";
import { hashPassword, comparePassword } from "../utils/password";
import { generateToken } from "../utils/jwt";

const userRepo = AppDataSource.getRepository(User);

export const registerUser = async (name: string, email: string, password: string, role: string) => {
  const hashed = await hashPassword(password);
  const user = userRepo.create({ name, email, password: hashed, role });
  const savedUser = await userRepo.save(user);
  const { password: _, ...userWithoutPassword } = savedUser;
  return userWithoutPassword;
};

export const loginUser = async (email: string, password: string) => {
  const user = await userRepo.findOneBy({ email });
  if (!user) throw new Error("User not found");
  const isMatch = await comparePassword(password, user.password);
  if (!isMatch) throw new Error("Invalid credentials");
  const token = generateToken({ id: user.id, role: user.role });
  const { password: _, ...userWithoutPassword } = user;
  return { user: userWithoutPassword, token };
};

export const getAllUsers = async () => {
  const users = await userRepo.find();
  return users.map(({ password, ...u }) => u);
};

export const getUserById = async (id: string) => {
  const user = await userRepo.findOneBy({ id: parseInt(id, 10) });
  if (!user) throw new Error("User not found");
  const { password, ...userWithoutPassword } = user;
  return userWithoutPassword;
};

export const updateUser = async (id: string, data: Partial<User>) => {
  const idNum = parseInt(id, 10);
  const user = await userRepo.findOneBy({ id: idNum });
  if (!user) throw new Error("User not found");
  if (data.password) {
    data.password = await hashPassword(data.password);
  }
  await userRepo.update(idNum, data);
  const updated = await userRepo.findOneBy({ id: idNum });
  if (!updated) throw new Error("User not found");
  const { password, ...userWithoutPassword } = updated;
  return userWithoutPassword;
};

export const deleteUser = async (id: string) => {
  const idNum = parseInt(id, 10);
  const user = await userRepo.findOneBy({ id: idNum });
  if (!user) throw new Error("User not found");
  await userRepo.remove(user);
  return { message: "User deleted successfully" };
};
