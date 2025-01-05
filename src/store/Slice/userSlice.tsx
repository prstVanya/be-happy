import { createSlice } from '@reduxjs/toolkit'
import { IUserBalanceResponse } from '@/types';

const initialState = {
  info: {},
  balance: {
    user_id: 0,
    balance: 0,
    income: 0,
  } as IUserBalanceResponse,
  buildings: [],
  referrals: [] as string[],
  timer: 0,
  dailyReward: 0,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUserInfoAction(state, action) {
      state.info = { ...state.info, ...action.payload };
    },
    setUserBalanceAction(state, action) {
      state.balance = { ...state.balance, ...action.payload };
    },
    setUserBuildingsAction(state, action) {
      state.buildings = action.payload;
    },
    setUserReferralAction(state, action) {
      if (!state.referrals.includes(action.payload)) {
        state.referrals.push(action.payload);
      }
    },
    setTimerAction(state, action) {
      state.timer = action.payload;
    },
    setDailyRewardAction(state, action) {
      state.dailyReward = action.payload;
    },
  },
});

export const {
  setUserInfoAction,
  setUserBalanceAction,
  setUserBuildingsAction,
  setUserReferralAction,
  setTimerAction,
  setDailyRewardAction,
} = userSlice.actions;
export default userSlice.reducer;