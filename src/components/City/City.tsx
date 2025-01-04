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
import { IBuilding, IBuildingData } from '@/types';
import { InfoPopup } from '../InfoPopup';

export const City = () => {
  const dispatch = useDispatch();
  const buildings = useSelector((state: any) => state.city.buildings);
  const balance = useSelector((state: any) => state.user.balance);
  const user = useSelector((state: any) => state.user.info);
  const [selectedBuilding, setSelectedBuilding] = useState<IBuilding | null>(null);
  const [userBuilding, setUserBuilding] = useState<IBuildingData[]>([]);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [isInfoPopup, setIsInfoPopup] = useState(false);
  const [isTextInfoPopup, setIsTextInfoPopup] = useState('');

  const fetchUserBuildings = async (): Promise<IBuildingData[]> => {
    try {
      const userBuildingsData = await userApi.getUserBuildings();
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
      const result = await userApi.buyBuilding(building.id);
      if (result.user_id) {
        const updatedBalance = balance.balance - buildingCost;
        const updatedIncome = balance.income + buildingIncome * balance.level * 1.1;
        const level = balance.level + 1;
        dispatch(setUserBalanceAction({
          user_id: user.id,
          balance: updatedBalance,
          income: updatedIncome,
          level: level,
        }));
        const updatedBuildings = await fetchUserBuildings();
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
    const building = await fetchUserBuildings();
    setUserBuilding(building);
  }

  const earnDailyReward = async () => {
    try {
      const result = await userApi.earnDaily();
      if (result.user_id && result.balance) {
        const updatedBalance = balance.balance + result.balance;

        dispatch(setUserBalanceAction({
          user_id: user.id,
          balance: updatedBalance,
          income: balance.income,
        }));
        setIsTextInfoPopup('Награда собрана!');
        setIsInfoPopup(true);

        setTimeout(() => {
          setIsInfoPopup(false);
          setIsTextInfoPopup('');
        }, 4000);
      } else {

        setIsTextInfoPopup('Награда собрана!');
        setIsInfoPopup(true);
        setTimeout(() => {
          setIsInfoPopup(false);
          setIsTextInfoPopup('');
        }, 4000);
      }

    } catch (err) {
      console.log(err);
      setIsTextInfoPopup(`Ошибка ${err}`);
      setIsInfoPopup(true);
      setTimeout(() => {
        setIsInfoPopup(false);
        setIsTextInfoPopup('');
      }, 4000);
    }
  }

  useEffect(() => {
    loadDataBuildings();
  }, []);

  const filteredBuildings = buildings.map((building: any, index: number) => {
    const levelRequirement = index + 1;
    const isAccessible = balance.level >= levelRequirement;
    const matchingUserBuilding = userBuilding.find(
      (userBuilding: any) => userBuilding.building_id === building.id
    );
    return {
      ...building,
      ...matchingUserBuilding,
      levelRequirement,
      isAccessible,
    };
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
        <InfoPopup isOpen={isInfoPopup} title={isTextInfoPopup} />
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
          level={balance.level}
          income={balance.income}
        />
        <FinanceLevel
          level={balance.level}
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
