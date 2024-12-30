import { MainPage } from '@/pages/MainPage';
import { Suspense } from 'react';
import { Route, Routes } from 'react-router-dom';
import { appPageRouteConfig } from '@/navigation/routes';
import { Loader } from '@/components/Loader';

const AppRouter = () => {
  return (
    <Suspense fallback={<Loader />}>
      <Routes>
        <Route path='/' element={<MainPage />}>
          {Object.values(appPageRouteConfig).map(({ path, element }) => (
            <Route key={path} path={path} element={element} />
          ))}
        </Route>
        <Route path="*" element={<MainPage />} />
      </Routes>
    </Suspense>
  );
};

export default AppRouter;
