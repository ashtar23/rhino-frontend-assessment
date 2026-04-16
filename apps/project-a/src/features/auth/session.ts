import { cookies } from "next/headers";
import { SessionUser } from "./auth.types";

const SESSION_COOKIE = "session";

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

export const setSessionCookie = async (value: string) => {
  const cookieStore = await cookies();

  cookieStore.set(SESSION_COOKIE, value, {
    httpOnly: true,
    path: "/",
  });
};

export const getSessionUser = async (): Promise<SessionUser | null> => {
  const cookieStore = await cookies();
  const sessionValue = cookieStore.get(SESSION_COOKIE)?.value;

  return parseSessionValue(sessionValue);
};

export const clearSessionCookie = async () => {
  const cookieStore = await cookies();

  cookieStore.set(SESSION_COOKIE, "", {
    httpOnly: true,
    path: "/",
    expires: new Date(0),
  });
};
