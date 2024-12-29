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


function getEthInfo(){
  let obj = {};

  try {
    const _ethInfo = localStorage.getItem('ethInfo');
    if (_ethInfo) {
      obj = JSON.parse(_ethInfo);
    }
  } catch (err){
    console.error('Error retrieving user info:', err instanceof Error ? err.message : err);
  }
  return obj;
}

function getSystemCOnfig(){
  let obj = {};

  try {
    const _ethInfo = localStorage.getItem('systemInfo');
    if (_ethInfo) {
      obj = JSON.parse(_ethInfo);
    }
  } catch (err){
    console.error('Error retrieving user info:', err instanceof Error ? err.message : err);
  }
  return obj;
}

const userSlice = createSlice({
  name: 'user',
  initialState: {
    info: getUserInfo(),
    eth: getEthInfo(),
    system: getSystemCOnfig()
  },
  reducers: {
    setUserInfoAction(state, action) {
      console.log('Данные для сохранения в Redux:', action.payload);
      state.info = { ...state.info, ...action.payload };
      localStorage.setItem('userInfo', JSON.stringify(state.info)); // сохраняем в localStorage
    },
    setEthAction(state, action) {
      state.eth = action.payload;
      localStorage.setItem('ethInfo', JSON.stringify(state.eth)); // сохраняем в localStorage
    },
    setSystemAction(state, action) {
      state.system = action.payload;
      localStorage.setItem('systemInfo', JSON.stringify(state.system)); // сохраняем в localStorage
    },
  },
});

export const { setUserInfoAction, setEthAction, setSystemAction } = userSlice.actions;
export default userSlice.reducer;