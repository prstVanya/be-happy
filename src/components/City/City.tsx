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
import React, { useEffect, useState } from 'react';
import { setUserBuildingsAction } from '@/store/Slice/userSlice';
import { IBuilding, IBuildingData, IUserInfoData } from '@/types';

export const City = () => {
  const dispatch = useDispatch();
  const buildings = useSelector((state: any) => state.city.buildings);
  const balance = useSelector((state: any) => state.user.balance);
  const user = useSelector((state: any) => state.user.info);
  const userBuildings = useSelector((state: any) => state.user.buildings);
  const [selectedBuilding, setSelectedBuilding] = useState<IBuilding | null>(null);
  const [userBuilding, setUserBuilding] = useState<IBuildingData[]>([]);
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const fetchUserBuildings = async (user: IUserInfoData): Promise<IBuildingData[]> => {
    try {
      const userBuildingsData = await userApi.getUserBuildings(user.id);
      return userBuildingsData || [];
    } catch (err) {
      console.error("Ошибка при загрузке зданий пользователя:", err);
      return [];
    }
  };

  const buyBuildingThunk = async (building: any) => {
    try {
      const result = await userApi.buyBuilding(user.id, building.id);
      if (result.user_id) {
        const updatedBuildings = await fetchUserBuildings(user);
        setUserBuilding(updatedBuildings); 
        dispatch(setUserBuildingsAction(updatedBuildings));
      } else {
        console.log('');
      }
    } catch (error) {
      console.error("Ошибка при покупке здания", error);
    }
  };

  const loadDataBuildings = async () => {
    const building = await fetchUserBuildings(user);
    setUserBuilding(building);
  }

  useEffect(() => {
    loadDataBuildings();
  }, []);

  const filteredBuildings = buildings.map((building: any) => {
    const matchingUserBuilding = userBuilding.find(
      (userBuilding: any) => userBuilding.building_id === building.id
    );
    return matchingUserBuilding ? { ...building, ...matchingUserBuilding } : building;
  });

  console.log(userBuilding);
  console.log('Filtered Buildings:', filteredBuildings);

  const handleBuyClick = (building: any) => {
    console.log(building);
    setSelectedBuilding(building);
    setIsPopupOpen(true);
  };

  const handleClosePopup = (evt: React.MouseEvent) => {
    evt.preventDefault();
    setIsPopupOpen(false);
    setSelectedBuilding(null);
  };

  console.log('useEffect triggered', { userBuildings, buildings });

  return (
    <main className={classNames(cls.main, {}, [])}>
      <div className={classNames(cls.div, {}, [])}>
        <BuyPopup
          handleBuy={buyBuildingThunk}
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
          userId={user.id}
          onBuyClick={handleBuyClick}
          buildings={filteredBuildings} 
        />
      </div>
    </main>
  );
};
