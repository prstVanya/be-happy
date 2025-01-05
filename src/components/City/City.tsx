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
import { setUserBuildingsAction, setUserBalanceAction, setDailyRewardAction } from '@/store/Slice/userSlice';
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
  console.log(buildings);

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
    setIsPopupOpen(false);
    setSelectedBuilding(null);
    try {
        const selectedBuilding = buildings.find((item: any) => item.id === building.id);
        if (!selectedBuilding) {
            console.error("Здание не найдено.");
            setIsTextInfoPopup('Здание не найдено.');
            setIsInfoPopup(true);
            setTimeout(() => {
              setIsInfoPopup(false);
              setIsTextInfoPopup('');
            }, 4000);
            return;
        }

        const buildingCost = Number(selectedBuilding.cost);
        const buildingIncome = Number(selectedBuilding.income);

        console.log(building.id);
        console.log(buildingCost, buildingIncome);

        if (isNaN(buildingCost) || isNaN(buildingIncome)) {
            setIsTextInfoPopup('Ошибка: underfind');
            setIsInfoPopup(true);
            setTimeout(() => {
                setIsInfoPopup(false);
                setIsTextInfoPopup('');
            }, 4000);
            return;
        }

        if (balance.balance < buildingCost) {
            setIsTextInfoPopup('Недостаточно средств для покупки здания.');
            setIsInfoPopup(true);
            setTimeout(() => {
                setIsInfoPopup(false);
                setIsTextInfoPopup('');
            }, 4000);
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

            setIsTextInfoPopup('Покупка здания прошла успешно!');
            setIsInfoPopup(true);
            setTimeout(() => {
              setIsInfoPopup(false);
              setIsTextInfoPopup('');
            }, 4000);
        } else {
            setIsTextInfoPopup('Покупка не удалась.');
            setIsInfoPopup(true);
            setTimeout(() => {
              setIsInfoPopup(false);
              setIsTextInfoPopup('');
            }, 4000);
        }
    } catch (error) {
        console.error("Ошибка при покупке здания", error);
        setIsTextInfoPopup('Ошибка при покупке здания.');
        setIsInfoPopup(true);
        setTimeout(() => {
          setIsInfoPopup(false);
          setIsTextInfoPopup('');
        }, 4000);
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
        dispatch(setUserBalanceAction({
          user_id: user.id,
          balance: result.balance,
          income: balance.income,
        }));

        dispatch(setDailyRewardAction(result.balance));
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
          isBuilding={userBuilding.length === 0}
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
