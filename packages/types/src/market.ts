export type Market = "en" | "ca";

export const isMarket = (value: string): value is Market => {
  return value === "en" || value === "ca";
};
