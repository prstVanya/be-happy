import { 
  useLaunchParams, 
  miniApp, 
  useSignal,
} from '@telegram-apps/sdk-react';
import { classNames } from '@/utils/classNames/className';
import { AppRoot } from '@telegram-apps/telegram-ui';
import { HashRouter } from 'react-router-dom';
import { AppRouter } from './AppRouter';
import { setUserInfoAction } from '@/store/Slice/userSlice';
import '@/vendor/index.css';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { mockInitData } from '@/utils/mockData/mockData';

import { IUserInfoData } from '@/types';
import { userApi } from '@/Api/UserApi';

export function App() {
  const lp = useLaunchParams();
  const isDark = useSignal(miniApp.isDark);
  const dispatch = useDispatch();

  const login = async () => {
    const initData = mockInitData;
    
    if (initData && initData.user && initData.user.id) {
      const user: IUserInfoData = {
        id: initData.user.id,
        first_name: initData.user.first_name || '',
        last_name: initData.user.last_name || '',
        username: initData.user.username || '',
      };
      try {
        const createUser = await userApi.addUser(user);
        dispatch(setUserInfoAction(createUser));
        localStorage.setItem('authorization', user.id.toString());
      } catch (err) {
        console.error("Error during login:", err);
      }
    }
  };

  useEffect(() => {
    login();
  }, []);

  return (
    <AppRoot
      appearance={isDark ? 'dark' : 'light'}
      platform={['macos', 'ios'].includes(lp.platform) ? 'ios' : 'base'}
    >
      <HashRouter>
        <div className={classNames('app test', {}, [])}>
          <div className={classNames('wrapper', {}, [])}>
            <AppRouter />
          </div>
        </div>
      </HashRouter>
    </AppRoot>
  );
}
