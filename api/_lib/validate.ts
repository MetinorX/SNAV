export const isEmail = (value: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(value);
};

export const isNonEmpty = (value: unknown): boolean => {
  return typeof value === "string" && value.trim().length > 0;
};

export const asString = (value: unknown): string => {
  return typeof value === "string" ? value.trim() : "";
};