import { classNames } from '../../../../utils/classNames/className';
import AvatarImage from '@/assets/images/avatar.jpeg';
import cls from './UserInfo.module.css';
import { useSelector } from 'react-redux';
import { useAppDispatch } from '@/hooks/useAppDispatch';
import { useEffect } from 'react';
import { fetchUserData } from '@/store/Slice/userSlice';
import { RootState } from '@/store';

interface IUserInfoData {
  title?: string;
  visibleTitle: boolean;
}

export const UserInfo = ({
   title, visibleTitle, 
  }: IUserInfoData) => {
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
    <div className={classNames(cls.info, {}, [])}>
      <div className={classNames(cls.mainInfo)}>
        <img
          className={classNames(cls.avatar, {}, [])}
          alt='avatar'
          src={user.avatar ?? AvatarImage}
        />
        <div className={classNames(cls.block, {}, [])}>
          <h1 className={classNames(cls.name, {}, [])}>
            {user.username}
          </h1>
          <div className={classNames(cls.code, {}, [])}>
            <p className={classNames(cls.id, {}, [])}>
              {`id: ${user.id}`}
            </p>
            <button className={classNames(cls.copy, {}, [])}></button>
          </div>
        </div>
      </div>
      {visibleTitle && <h2 className={classNames(cls.pageTitle, {}, [])}>{title}</h2>}
    </div>
  );
};
