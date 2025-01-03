import { createSlice } from '@reduxjs/toolkit'

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
    balance: 0,
  },
  reducers: {
    setUserInfoAction(state, action) {
      console.log('Данные для сохранения в Redux:', action.payload);
      state.info = { ...state.info, ...action.payload };
      localStorage.setItem('userInfo', JSON.stringify(state.info)); // сохраняем в localStorage
    },
    setUserBalanceAction(state, action) {
      state.balance = action.payload;
    },
  },
});

export const { setUserInfoAction, setUserBalanceAction } = userSlice.actions;
export default userSlice.reducer;