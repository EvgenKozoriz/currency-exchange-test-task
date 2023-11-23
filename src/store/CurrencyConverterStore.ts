import { create } from "zustand";

interface ICurrencyConverterStore {
  inputChangeValue: string;
  inputGetValue: string;
  exchangeRates: {
    UAH: string;
    CZK: string;
    [key: string]: string;
  };
  currencies: string[];
  fromCurrency: string;
  toCurrency: string;
  showAddedAlert: boolean;
  setInputChangeValue: (value: string) => void;
  setinputGetValue: (value: string) => void;
  setFromCurrency: (value: string) => void;
  setToCurrency: (value: string) => void;
  updateExchangeRate: (currency: string, newRate: string) => void;
  addCurrency: (currency: string) => void;
  openIsAdded: () => void;
  closeIsAdded: () => void;
}

export const useCurrencyConverter = create<ICurrencyConverterStore>((set) => ({
  inputChangeValue: "0",
  inputGetValue: "0",
  exchangeRates: {
    UAH: "1",
    CZK: "1.6",
  },
  currencies: ["UAH", "CZK"],
  fromCurrency: "UAH",
  toCurrency: "CZK",
  showAddedAlert: false,

  setInputChangeValue: (value: string) => set({ inputChangeValue: value }),
  setinputGetValue: (value: string) => set({ inputGetValue: value }),
  setFromCurrency: (value: string) => set({ fromCurrency: value }),
  setToCurrency: (value: string) => set({ toCurrency: value }),

  updateExchangeRate: (currency: string, newRate: string) =>
    set((state) => ({
      exchangeRates: { ...state.exchangeRates, [currency]: newRate },
    })),

  addCurrency: (currency: string) =>
    set((state) => {
      if (!state.currencies.includes(currency)) {
        return { currencies: [...state.currencies, currency] };
      }
      return state;
    }),

  openIsAdded: () => set({ showAddedAlert: true }),
  closeIsAdded: () => set({ showAddedAlert: false }),
}));
