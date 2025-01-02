import { configureStore } from "@reduxjs/toolkit";
import userSlice from './Slice/userSlice';
import citySlice from './Slice/citySlice';

export const store = configureStore({
  reducer: {
    user: userSlice,
    city: citySlice,
  },
  middleware:getDefaultMiddleware => getDefaultMiddleware({
    serializableCheck: false
  })
});

export default store;