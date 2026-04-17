import {
  SESSION_COOKIE,
  createSessionValue,
  parseSessionValue,
} from "./session";

describe("session helpers", () => {
  it("exports the session cookie name", () => {
    expect(SESSION_COOKIE).toBe("session");
  });

  it("creates and parses a session value", () => {
    const value = createSessionValue({
      username: "user",
      role: "user",
    });

    expect(parseSessionValue(value)).toEqual({
      username: "user",
      role: "user",
    });
  });

  it("returns null for invalid session data", () => {
    expect(parseSessionValue("not-valid-base64")).toBeNull();
  });

  it("returns null for missing session data", () => {
    expect(parseSessionValue()).toBeNull();
  });
});
