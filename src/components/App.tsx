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
import { IBuildingBlock, IUserInfoData } from '@/types';
import { userApi } from '@/Api/UserApi';
import { cityAdd } from './City/model/cityAdd';
import WebApp from '@twa-dev/sdk';

export function App() {
  const lp = useLaunchParams();
  const isDark = useSignal(miniApp.isDark);
  const dispatch = useDispatch();
  const [userCache, setUserCache] = useState<IUserInfoData | null>(null);
  const [buildingsCache, setBuildingsCache] = useState<IBuildingBlock[] | []>([]);

  const checkUser = async (): Promise<IUserInfoData | null> => {
    if (userCache) return userCache;

    const initData = WebApp.initDataUnsafe;
    if (!initData?.user?.id) {
      console.error("User data is missing.");
      return null;
    }

    try {
      const { user: existingUser } = await userApi.getUserById();
      dispatch(setUserInfoAction(existingUser));
      setUserCache(existingUser);
      return existingUser;
    } catch (err) {
      console.warn("User not found, creating new user.");
      
      try {
        const newUser = await userApi.addUser();
        dispatch(setUserInfoAction(newUser));
        setUserCache(newUser);
        return newUser;
      } catch (addUserErr) {
        console.error("Error creating new user:", addUserErr);
        return null;
      }
    }
  };

  const login = async () => {
    const user = await checkUser();
    if (user) {
      localStorage.setItem('authorization', user.id.toString());
    }
  };

  const fetchUserBalance = async (user: IUserInfoData) => {
    if (!user) {
      console.error("User data is missing.");
      return;
    }
    
    try {
      const response = await userApi.getUserBalance(user.id);
      dispatch(setUserBalanceAction({ user_id: user.id, balance: response.balance }));
    } catch (error) {
      console.error("Error fetching user balance:", error);
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

  // Fetch all available buildings.
  const fetchAllBuildings = async () => {
    if (buildingsCache.length > 0) return;

    try {
      const buildings = await userApi.getAllBuildings();
      dispatch(setBuildings(buildings));
    } catch (err) {
      console.error("Error loading buildings:", err);
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

  // Use effect to initialize user and data.
  useEffectOnce(() => {
    const initUser = async () => {
      const user = await checkUser();
      if (user) {
        await login();
        await createBuilding(user);
        await fetchUserBalance(user);
        await fetchAllBuildings();
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
