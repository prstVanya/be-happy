import { classNames } from '@/utils/classNames/className';
import { UserInfo } from './UserInfo';
import { UserChoices } from './UserChoices';
import { Slider } from './Slider';
import { PromoCodeSection } from './PromoCodeSection';
import { StageSection } from './StagesSection';
import cls from './Profile.module.css';
import { useSelector } from 'react-redux';
import { useAppDispatch } from '@/hooks/useAppDispatch';
import { useEffect } from 'react';
import { fetchUserData } from '@/store/Slice/userSlice';
import { RootState } from '@/store';

export const Profile = () => {
  const dispatch = useAppDispatch();
  const user = useSelector((state: RootState) => state.user.data);
  const status = useSelector((state: RootState) => state.user.status);

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchUserData());
    }
  }, [dispatch, status]);

  if (!user) {
    return null;
  }

  return (
    <main className={classNames(cls.main, {}, [])}>
      <div className={classNames(cls.content, {}, [])}>
        <UserInfo 
          visibleTitle={false} 
          username={user.username}
          id={user.id}
          avatar={user.avatar}
        />
        <UserChoices />
        <Slider />
        <PromoCodeSection />
        <StageSection />
      </div>
    </main>
  );
};
