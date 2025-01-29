import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface CurrencyState {
  baseCurrency: string;
  destinationCurrency: string;
  exchangeRate: number;
}

const initialState: CurrencyState = {
  baseCurrency: '',
  destinationCurrency: '',
  exchangeRate: 0,
};

const currencySlice = createSlice({
  name: 'currency',
  initialState,
  reducers: {
    setCurrency: (
      state,
      action: PayloadAction<{ baseCurrency: string; destinationCurrency: string; exchangeRate: number }>
    ) => {
      // Update state
      state.baseCurrency = action.payload.baseCurrency;
      state.destinationCurrency = action.payload.destinationCurrency;
      state.exchangeRate = action.payload.exchangeRate;

      // Log the updated data in the state
      console.log('Data saved to store:', {
        baseCurrency: state.baseCurrency,
        destinationCurrency: state.destinationCurrency,
        exchangeRate: state.exchangeRate,
      });
    },
  },
});

export const { setCurrency } = currencySlice.actions;
export default currencySlice.reducer;
