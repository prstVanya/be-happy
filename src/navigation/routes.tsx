import { RouteProps } from 'react-router-dom';
import { MainPage } from '@/pages/MainPage';
import { Profile } from '@/components/Profile';
import { City } from '@/components/City';
import { Bonus } from '@/components/Bonus';
import { ReferalPage } from '@/components/ReferalPage';

export enum AppMainPageRoutes {
  MAIN = 'main',
  PROFILE = 'profile',
  CITY = 'city',
  BONUS = 'bonus',
  REFERAL = 'referal',
}

export const AppMainPageRoutePath: Record<AppMainPageRoutes, string> = {
  [AppMainPageRoutes.MAIN]: '/',
  [AppMainPageRoutes.PROFILE]: '/profile',
  [AppMainPageRoutes.CITY]: '/city',
  [AppMainPageRoutes.BONUS]: '/bonus',
  [AppMainPageRoutes.REFERAL]: '/referal',
};

export const appPageRouteConfig: Record<AppMainPageRoutes, RouteProps> = {
  [AppMainPageRoutes.MAIN]: {
    path: AppMainPageRoutePath.main,
    element: <MainPage />,
  },
  [AppMainPageRoutes.PROFILE]: {
    path: AppMainPageRoutePath.profile,
    element: <Profile />,
  },
  [AppMainPageRoutes.CITY]: {
    path: AppMainPageRoutePath.city,
    element: <City />,
  },
  [AppMainPageRoutes.BONUS]: {
    path: AppMainPageRoutePath.bonus,
    element: <Bonus />
  },
  [AppMainPageRoutes.REFERAL]: {
    path: AppMainPageRoutePath.referal,
    element: <ReferalPage />
  }
};

