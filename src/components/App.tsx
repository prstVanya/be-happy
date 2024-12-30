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
import WebApp from '@twa-dev/sdk';
import '@/vendor/index.css';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { userApi } from '@/Api/UserApi';

export function App() {
  const lp = useLaunchParams();
  const isDark = useSignal(miniApp.isDark);
  const dispatch = useDispatch();

  const login = async () => {
    const initData = WebApp.initDataUnsafe;
    
    if (initData && initData.user && initData.user.id) {
      const user = initData.user;

      try {
        const data = {
          id: user.id,
          first_name: user.first_name,
          last_name: user.last_name,
          username: user.username,
        }
        console.log(data)
        const createdUser = await userApi.addUser(data);

        dispatch(setUserInfoAction(createdUser));
        localStorage.setItem('authorization', user.id.toString());
      } catch (err) {
        console.error('Error creating user:', err instanceof Error ? err.message : err);
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
