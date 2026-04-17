import { validateCredentials } from "./validate-credentials";

describe("validateCredentials", () => {
  it("returns a session user for valid credentials", () => {
    expect(validateCredentials("admin", "password123")).toEqual({
      username: "admin",
      role: "admin",
    });
  });

  it("returns null for invalid credentials", () => {
    expect(validateCredentials("admin", "wrong-password")).toBeNull();
  });
});
