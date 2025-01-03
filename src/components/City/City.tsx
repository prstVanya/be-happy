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
import { setUserBuildingsAction, setUserBalanceAction } from '@/store/Slice/userSlice';
import { IBuilding, IBuildingData, IUserInfoData } from '@/types';

export const City = () => {
  const dispatch = useDispatch();
  const buildings = useSelector((state: any) => state.city.buildings);
  const balance = useSelector((state: any) => state.user.balance);
  const user = useSelector((state: any) => state.user.info);
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
      const selectedBuilding = buildings.find((item: any) => item.id === building.id);
      if (!selectedBuilding) {
        console.error("Здание не найдено.");
        return;
      }
      const buildingCost = Number(selectedBuilding.cost);
      const buildingIncome = Number(selectedBuilding.income);

      console.log(building.id);
      console.log(buildingCost, buildingIncome);

      if (isNaN(buildingCost) || isNaN(buildingIncome)) {
        console.error('Ошибка: неверные значения для стоимости или дохода здания');
        return;
      }
      const result = await userApi.buyBuilding(user.id, building.id);
      if (result.user_id) {
        const updatedBalance = balance.balance - buildingCost;
        const updatedIncome = balance.income + buildingIncome;
        dispatch(setUserBalanceAction({
          user_id: user.id,
          balance: updatedBalance,
          income: updatedIncome,
        }));
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

  const earnDailyReward = async () => {
    try {
      const result = await userApi.earnDaily(user.id);
      if (result.user_id && result.balance) {
        const updatedBalance = balance.balance + result.balance;

        dispatch(setUserBalanceAction({
          user_id: user.id,
          balance: updatedBalance,
          income: balance.income,
        }));
      }

    } catch (err) {
      console.log(err);
    }
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
        <CityLevel
          income={balance.income}
        />
        <FinanceLevel
          onSubmit={earnDailyReward}
        />
        <Business
          userId={user.id}
          onBuyClick={handleBuyClick}
          buildings={filteredBuildings} 
        />
      </div>
    </main>
  );
};
