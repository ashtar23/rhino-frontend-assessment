import { cookies } from "next/headers";
import {
  SESSION_COOKIE,
  createSessionValue,
  parseSessionValue,
  type SessionUser,
} from "@repo/auth";

export { createSessionValue };

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
