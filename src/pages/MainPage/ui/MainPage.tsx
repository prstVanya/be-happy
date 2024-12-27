import { classNames } from '@/utils/classNames/className';
import { Outlet } from 'react-router-dom';
import { NavBar } from '@/components/NavBar';
import cls from './MainPage.module.css';

const MainPage = () => {
  return (
    <div className={classNames(cls.main, {}, [])}>
      <Outlet />
      <NavBar className={classNames(cls.nav, {}, [])} />
    </div>
  );
};

export default MainPage;
