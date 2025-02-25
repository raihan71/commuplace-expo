import { createSlice } from '@reduxjs/toolkit';

const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    items: [],
    badgeCount: 0,
  },
  reducers: {
    setBadgeCount: (state, action) => {
      state.badgeCount = action.payload;
    },
    updateCartItems: (state, action) => {
      state.items = action.payload;
      state.badgeCount = action.payload.length;
    },
  },
});

export const { setBadgeCount, updateCartItems } = cartSlice.actions;
export default cartSlice.reducer;
