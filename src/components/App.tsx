import { 
  useLaunchParams, 
  miniApp, 
  useSignal,
} from '@telegram-apps/sdk-react';
import { classNames } from '@/utils/classNames/className';
import { AppRoot } from '@telegram-apps/telegram-ui';
import { HashRouter } from 'react-router-dom';
import { AppRouter } from './AppRouter';
import { setUserInfoAction } from '@/store/Slice/userSlice';
import { addBuilding } from '@/store/Slice/citySlice';
import '@/vendor/index.css';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { mockInitData } from '@/utils/mockData/mockData';
import { IUserInfoData } from '@/types';
import { userApi } from '@/Api/UserApi';
import { cityAdd } from './City/model/cityAdd';

export function App() {
  const lp = useLaunchParams();
  const isDark = useSignal(miniApp.isDark);
  const dispatch = useDispatch();

  const checkUser = async (): Promise<IUserInfoData | null> => {
    const initData = mockInitData;

    if (!initData || !initData.user || !initData.user.id) {
      console.error("No user data found in initialization parameters.");
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
        return existingUser.user;
      }
    } catch (err) {
      console.warn("User not found, creating a new user...");

      try {
        const newUser = await userApi.addUser(user);
        dispatch(setUserInfoAction(newUser));
        return newUser;
      } catch (addUserErr) {
        console.error("Error creating a new user:", addUserErr);
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

  const createBuilding = async () => {
    const user = await checkUser();

    if (!user) {
      console.error("Cannot create buildings, user does not exist.");
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
      }
    } catch (err) {
      console.error("Error while creating buildings:", err);
    }
  };

  useEffect(() => {
    login();
    createBuilding();
  }, []);

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
