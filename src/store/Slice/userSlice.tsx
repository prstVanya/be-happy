import { createSlice } from '@reduxjs/toolkit'
import { IUserBalanceResponse } from '@/types';

function getUserInfo(){
  let obj = {};

  try {
    const _userInfo = localStorage.getItem('userInfo')
    if (_userInfo) {
      obj = JSON.parse(_userInfo)
    }
  } catch (err) {
    console.error('Error retrieving user info:', err instanceof Error ? err.message : err);
  }
  return obj
}

const userSlice = createSlice({
  name: 'user',
  initialState: {
    info: getUserInfo(),
    balance: {
      user_id: 0,
      balance: 0,
      income: 0,
    } as IUserBalanceResponse,
    buildings: [],
  },
  reducers: {
    setUserInfoAction(state, action) {
      console.log('Данные для сохранения в Redux:', action.payload);
      state.info = { ...state.info, ...action.payload };
      localStorage.setItem('userInfo', JSON.stringify(state.info));
    },
    setUserBalanceAction(state, action) {
      console.log('Данные баланса для сохранения в Redux:', action.payload);
      state.balance = { ...state.balance, ...action.payload };
    },
    setUserBuildingsAction(state, action) {
      state.buildings = action.payload;
      localStorage.setItem('userBuildings', JSON.stringify(state.buildings));
    },
  },
});

export const { 
  setUserInfoAction, setUserBalanceAction, setUserBuildingsAction 
} = userSlice.actions;
export default userSlice.reducer;