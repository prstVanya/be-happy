import { classNames } from '@/utils/classNames/className';
import { UserInfo } from '../Profile/UserInfo';
import { CityLevel } from './CityLevel';
import { FinanceLevel } from './FinanceLevel';
import { Business } from './Business';
import { BackgroundCity } from '../Background';
import cls from './City.module.css';
import { BuyPopup } from '../BuyPopup';
import { useDispatch, useSelector } from 'react-redux';
import { userApi } from '@/Api/UserApi';
import { useEffect } from 'react';
import { setBuildings } from '@/store/Slice/citySlice';

export const City = () => {
  const dispatch = useDispatch();
  const buildings = useSelector((state: any) => state.city.buildings);

  const fetchAllBuildings = async () => {
    try {
      const data = await userApi.getAllBuildings();
      dispatch(setBuildings(data));
    } catch (err) {
      console.error('Ошибка при загрузке зданий:', err);
    }
  }

  useEffect(() => {
    fetchAllBuildings();
  }, [dispatch])
  return (
    <main className={classNames(cls.main, {}, [])}>
      <div className={classNames(cls.div, {}, [])}>
        <BuyPopup isOpen={false} />
        <UserInfo 
          visibleTitle={true} 
          title='HappyCiy' 
        />
        <BackgroundCity />
        <CityLevel />
        <FinanceLevel />
        <Business buildings={buildings} />
      </div>
    </main>
  );
};
