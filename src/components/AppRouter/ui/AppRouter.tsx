import { MainPage } from '@/pages/MainPage';
import { Suspense } from 'react';
import { Route, Routes } from 'react-router-dom';
import { appPageRouteConfig } from '@/navigation/routes';

const AppRouter = () => {
  return (
    <Suspense fallback='Загрузка...'>
      <Routes>
        <Route element={<MainPage />}>
          {Object.values(appPageRouteConfig).map(({ path, element }) => (
            <Route key={path} path={path} element={element} />
          ))}
        </Route>
      </Routes>
    </Suspense>
  );
};

export default AppRouter;
