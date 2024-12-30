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

export function App() {
  const lp = useLaunchParams();
  const isDark = useSignal(miniApp.isDark);
  const dispatch = useDispatch();

  const login = async () => {
    const initData = WebApp.initDataUnsafe;
    
    if (initData && initData.user && initData.user.id) {
      const user = initData.user;
      dispatch(setUserInfoAction(user));
      localStorage.setItem('authorization', user.id.toString());
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
