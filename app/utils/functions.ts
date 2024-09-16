import bcrypt from "bcryptjs";

export const hashPassword = async (password: string): Promise<string> => {
  const saltRounds = 10; // Number of salt rounds for bcrypt
  try {
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    return hashedPassword;
  } catch (error) {
    throw new Error("Error hashing password");
  }
};

export const comparePassword = async (password: string, hashedPassword: string): Promise<boolean> => {
  try {
    const match = await bcrypt.compare(password, hashedPassword);
    return match; // Returns true if passwords match, false otherwise
  } catch (error) {
    throw new Error("Error comparing passwords");
  }
};
