import { Role, SessionUser } from "./auth.types";
import credentials from "./credentials.json";

export const validateCredentials = (
  username: string,
  password: string,
): SessionUser | null => {
  const record = credentials.find(
    (item) => item.username === username && item.password === password,
  );

  if (!record) return null;

  return {
    username: record.username,
    role: record.role as Role,
  };
};
