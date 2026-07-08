export type Favorite = {
  id: string;

  name: string;

  initialValue: string;
  targetValue: string;

  sourceCurrency: "USD" | "EUR" | "GBP";
  targetCurrency: "USD" | "EUR" | "GBP";

  date: string;
  historicalDate: string;
};
