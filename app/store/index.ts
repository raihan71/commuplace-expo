import { configureStore } from '@reduxjs/toolkit';
import { thunk } from 'redux-thunk';
import mySlice from '../reducers/mySlice';
import cartSlice from '../reducers/cartSlice';

const store = configureStore({
    reducer: {
        slice: mySlice,
        cart: cartSlice,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(thunk),
});

export default store;