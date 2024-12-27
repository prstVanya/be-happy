import { classNames } from '@/utils/classNames/className';
import { UserInfo } from '../Profile/UserInfo';
import { CityLevel } from './CityLevel';
import { FinanceLevel } from './FinanceLevel';
import { Business } from './Business';
import cls from './City.module.css';

export const City = () => {
  return (
    <main className={classNames(cls.main, {}, [])}>
      <div className={classNames(cls.div, {}, [])}>
        <UserInfo visibleTitle={true} title='HappyCiy' />
        <CityLevel />
        <FinanceLevel />
        <Business />
      </div>
    </main>
  );
};
