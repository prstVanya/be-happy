import { IUserState } from '@/types';
import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import AvatarImage from '@/assets/images/avatar.jpeg';

export const fetchUserData = createAsyncThunk<IUserState, void, { rejectValue: string }>(
  'user/fetchUserData',
  async (_, { rejectWithValue }) => {
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
      const tg = window.Telegram.WebApp;

      if (tg.initDataUnsafe?.user?.id) {
        const userData: IUserState = {
          id: tg.initDataUnsafe.user.id.toString(),
          first_name: tg.initDataUnsafe.user.first_name || undefined,
          last_name: tg.initDataUnsafe.user.last_name || undefined,
          username: tg.initDataUnsafe.user.username || '',
          avatar: tg.initDataUnsafe.user.photo_url || null,
        };
        console.log("User data from Telegram:", JSON.stringify(userData));
        return userData;
      }

      const urlParams = new URLSearchParams(window.location.search);
      const userID = urlParams.get('user_id');

      if (userID) {
        console.log("User ID from URL:", userID);
        return {
          id: userID,
          first_name: undefined,
          last_name: undefined,
          username: '',
          avatar: null,
        };
      }

      return rejectWithValue('User data is unavailable');
    } else {
      return rejectWithValue('Telegram WebApp not available');
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