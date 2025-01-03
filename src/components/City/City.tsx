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
import { useEffect, useState } from 'react';
import { setBuildings } from '@/store/Slice/citySlice';

export const City = () => {
  const dispatch = useDispatch();
  const buildings = useSelector((state: any) => state.city.buildings);
  const balance = useSelector((state: any) => state.user.balance);
  const [selectedBuilding, setSelectedBuilding] = useState<any>(null); // Состояние для выбранного здания
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const fetchAllBuildings = async () => {
    try {
      const data = await userApi.getAllBuildings();
      dispatch(setBuildings(data));
    } catch (err) {
      console.error('Ошибка при загрузке зданий:', err);
    }
  }

  const handleBuyClick = (building: any) => {
    setSelectedBuilding(building);
    setIsPopupOpen(true);
  };

  const handleClosePopup = () => {
    setIsPopupOpen(false);
    setSelectedBuilding(null);
  };

  useEffect(() => {
    fetchAllBuildings();
  }, [dispatch])
  return (
    <main className={classNames(cls.main, {}, [])}>
      <div className={classNames(cls.div, {}, [])}>
        <BuyPopup
          balance={balance}
          onClose={handleClosePopup}
          isOpen={isPopupOpen}
          building={selectedBuilding}
          />
        <UserInfo 
          visibleTitle={true} 
          title='HappyCiy' 
        />
        <BackgroundCity />
        <CityLevel />
        <FinanceLevel />
        <Business
          onBuyClick={handleBuyClick}
          buildings={buildings} 
        />
      </div>
    </main>
  );
};
