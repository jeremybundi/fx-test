import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface CurrencyState {
  baseCurrency: string;
  destinationCurrency: string;
  exchangeRate: number;
  markup: number;
  dateOfEffect: string; // Add dateOfEffect field
}

const initialState: CurrencyState = {
  baseCurrency: '',
  destinationCurrency: '',
  exchangeRate: 0,
  markup: 0,
  dateOfEffect: '', // Initialize as empty string
};

const currencySlice = createSlice({
  name: 'currency',
  initialState,
  reducers: {
    setCurrency: (
      state,
      action: PayloadAction<{
        baseCurrency: string;
        destinationCurrency: string;
        exchangeRate: number;
        markup: number;
        dateOfEffect: string;
      }>
    ) => {
      // Update state
      state.baseCurrency = action.payload.baseCurrency;
      state.destinationCurrency = action.payload.destinationCurrency;
      state.exchangeRate = action.payload.exchangeRate;
      state.markup = action.payload.markup;
      state.dateOfEffect = action.payload.dateOfEffect; // Update dateOfEffect

      // Log the updated data in the state
      console.log('Data saved to store by edit:', {
        baseCurrency: state.baseCurrency,
        destinationCurrency: state.destinationCurrency,
        exchangeRate: state.exchangeRate,
        markup: state.markup,
        dateOfEffect: state.dateOfEffect, // Log dateOfEffect
      });
    },
  },
});

export const { setCurrency } = currencySlice.actions;
export default currencySlice.reducer;
