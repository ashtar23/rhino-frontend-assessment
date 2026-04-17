import type { SessionUser } from "./auth.types";

export const SESSION_COOKIE = "session";

export const createSessionValue = (user: SessionUser) => {
  return Buffer.from(JSON.stringify(user)).toString("base64");
};

export const parseSessionValue = (value?: string | null) => {
  if (!value) return null;

  try {
    const decoded = Buffer.from(value, "base64").toString("utf-8");
    return JSON.parse(decoded) as SessionUser;
  } catch {
    return null;
  }
};
