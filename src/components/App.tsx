import { 
  useLaunchParams, 
  miniApp, 
  useSignal,
} from '@telegram-apps/sdk-react';
import { classNames } from '@/utils/classNames/className';
import { AppRoot } from '@telegram-apps/telegram-ui';
import { HashRouter } from 'react-router-dom';
import { AppRouter } from './AppRouter';
import { setUserInfoAction, setUserBalanceAction } from '@/store/Slice/userSlice';
import { addBuilding, setBuildings } from '@/store/Slice/citySlice';
import '@/vendor/index.css';
import { useDispatch } from 'react-redux';
import { useEffect, useState, useRef } from 'react';
import { mockInitData } from '@/utils/mockData/mockData';
import { IBuildingBlock, IUserInfoData } from '@/types';
import { userApi } from '@/Api/UserApi';
import { cityAdd } from './City/model/cityAdd';

export function App() {
  const lp = useLaunchParams();
  const isDark = useSignal(miniApp.isDark);
  const dispatch = useDispatch();
  const [userCache, setUserCache] = useState<IUserInfoData | null>(null);
  const [buildingsCache, setBuildingsCache] = useState<IBuildingBlock[] | []>([]);
  const [isInitialized, setIsInitialized] = useState(false);

const checkUser = async (): Promise<IUserInfoData | null> => {
  if (userCache) return userCache; 
  const initData = mockInitData;

  if (!initData || !initData.user || !initData.user.id) {
    console.error("пользователя нет.");
    return null;
  }

  const user: IUserInfoData = {
    id: Number(initData.user.id),
    first_name: initData.user.first_name || '',
    last_name: initData.user.last_name || '',
    username: initData.user.username || '',
  };

  try {
    const existingUser = await userApi.getUserById(user.id);

    if (existingUser?.user) {
      dispatch(setUserInfoAction(existingUser.user));
      setUserCache(existingUser.user); 
      return existingUser.user;
    }
  } catch (err) {
    console.warn("создание пользователя");

    try {
      const newUser = await userApi.addUser(user);
      dispatch(setUserInfoAction(newUser));
      setUserCache(newUser); 
      return newUser;
    } catch (addUserErr) {
      console.error("ошибка:", addUserErr);
      return null;
    }
  }

  return null;
};

const login = async () => {
  const user = await checkUser();
  if (user) {
    localStorage.setItem('authorization', user.id.toString());
  }
};

const fetchUserBalance = async (user: IUserInfoData) => {
  try {
    if (user) {
      const userId = user.id;
      console.log(userId)
      const response = await userApi.getUserBalance(userId);
      console.log(response);
      dispatch(setUserBalanceAction({
        user_id: user.id,
        balance: response.balance,
        income: response.income,
      }));
    } else {
      console.error("пользователя нет.");
    }
  } catch (error) {
    console.error("ошибка:", error);
  }
};

const createBuilding = async (user: IUserInfoData) => {
  if (!user) {
    console.error("пользователя нет");
    return;
  }
  try {
    for (const building of cityAdd) {
      const createdBuilding = await userApi.addBuilding({
        name: building.name,
        income: building.income,
        cost: building.cost,
      });

      dispatch(addBuilding({
        income: createdBuilding.income,
        cost: createdBuilding.cost,
        name: building.name,
        image: building.image,
      }));
      setBuildingsCache(prev => [...prev, createdBuilding]); 
    }
  } catch (err) {
    console.error("ошибка:", err);
  }
};

const fetchAllBuildings = async () => {
  if (buildingsCache.length > 0) return; 

  try {
    const data = await userApi.getAllBuildings();
    dispatch(setBuildings(data));
  } catch (err) {
    console.error('Ошибка при загрузке зданий:', err);
  }
};

type EffectCallback = () => void;
const useEffectOnce = (callback: EffectCallback) => {
  const hasExecuted = useRef(false);

  useEffect(() => {
    if (hasExecuted.current) return;
    hasExecuted.current = true;
    callback();
  }, [callback]);
};

useEffectOnce(() => {
  const initUser = async () => {
    const user = await checkUser();
    
    if (user) {
      await login();
      await createBuilding(user);
      await fetchUserBalance(user);
      await fetchAllBuildings();
      setIsInitialized(true);
    }
  };

  initUser();
});

  return (
    <AppRoot
      appearance={isDark ? 'dark' : 'light'}
      platform={['macos', 'ios'].includes(lp.platform) ? 'ios' : 'base'}
    >
      <HashRouter>
        <div className={classNames('app test', {}, [])}>
          <div className={classNames('wrapper', {}, [])}>
            <AppRouter />
          </div>
        </div>
      </HashRouter>
    </AppRoot>
  );
}
