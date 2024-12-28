import { IUserState } from '@/types';
import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import AvatarImage from '@/assets/images/avatar.jpeg';

export const fetchUserData = createAsyncThunk<IUserState, void>(
  'user/fetchUserData',
  async () => {
    if (import.meta.env.DEV) {
      const mockData: IUserState = {
        id: '99281932',
        first_name: 'Andrew',
        last_name: 'Rogue',
        username: 'rogue',
        avatar: AvatarImage,
      };
      return mockData;
    } else if (window.Telegram && window.Telegram.WebApp) {
      const user = window.Telegram.WebApp.initDataUnsafe.user;
      const userData: IUserState = {
        id: user?.id.toString() || '',
        first_name: user?.first_name || '',
        last_name: user?.last_name || '',
        username: user?.last_name || '',
        avatar: user?.photo_url || '',
      };

      return userData;
    } else {
      throw new Error('Telegram WebApp not available');
    }
  }
);


interface UserState {
  data: IUserState | null;
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
}

const initialState: UserState = {
  data: null,
  status: 'idle',
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserData.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchUserData.fulfilled, (state, action: PayloadAction<IUserState>) => {
        state.status = 'succeeded';
        state.data = action.payload;
      })
      .addCase(fetchUserData.rejected, (state) => {
        state.status = 'failed';
      });
  },
});

export default userSlice.reducer;