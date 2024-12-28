import { useLaunchParams, miniApp, useSignal } from '@telegram-apps/sdk-react';
import { classNames } from '@/utils/classNames/className';
import { AppRoot } from '@telegram-apps/telegram-ui';
import { BrowserRouter } from 'react-router-dom';
import { AppRouter } from './AppRouter';
import '@/vendor/index.css';

export function App() {
  const lp = useLaunchParams();
  const isDark = useSignal(miniApp.isDark);

  return (
    <AppRoot
      appearance={isDark ? 'dark' : 'light'}
      platform={['macos', 'ios'].includes(lp.platform) ? 'ios' : 'base'}
    >
      <BrowserRouter>
        <div className={classNames('app test', {}, [])}>
          <div className={classNames('wrapper', {}, [])}>
            <AppRouter />
          </div>
        </div>
      </BrowserRouter>
    </AppRoot>
  );
}
