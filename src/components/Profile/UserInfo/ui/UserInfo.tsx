import { classNames } from '../../../../utils/classNames/className';
import AvatarImage from '@/assets/images/avatar.jpeg';
import CopyIconSvg from '@/assets/images/icons/copy.svg';
import cls from './UserInfo.module.css';
import { useSelector, useDispatch } from 'react-redux';
import { useState } from 'react';
import { setUserInfoAction } from '@/store/Slice/userSlice';
import { useEffect } from 'react';
import WebApp from '@twa-dev/sdk';
import { InfoPopup } from '@/components/InfoPopup';

interface IUserInfoData {
  title?: string;
  visibleTitle: boolean;
}

export const UserInfo = ({
   title, visibleTitle 
}: IUserInfoData) => {
  const userInfo = useSelector((state: any) => state.user.info);
  const dispatch = useDispatch();
  const [isInfoPopup, setIsInfoPopup] = useState(false);
  const [isTextInfoPopup, setIsTextInfoPopup] = useState('');

  const handleClickToCopy = () => {
    const id = userInfo?.id;
    navigator.clipboard.writeText(id);
    setIsInfoPopup(true);
    setIsTextInfoPopup('Id скопирован!');
    setTimeout(() => {
      setIsInfoPopup(false);
      setIsTextInfoPopup('');
    }, 4000);
  }
  
  const fetchUserInfo = () => {
    const initData = WebApp.initDataUnsafe;

    if (initData && initData.user) {
      const user = initData.user;

      dispatch(setUserInfoAction(user));
    } else {
      console.error('Не удалось получить данные пользователя из WebApp');
    }
  };

  useEffect(() => {
    fetchUserInfo();
  }, [dispatch]);

  return (
    <div className={classNames(cls.info, {}, [])}>
      <div className={classNames(cls.mainInfo)}>
        <InfoPopup isOpen={isInfoPopup} title={isTextInfoPopup} />
        <img
          className={classNames(cls.avatar, {}, [])}
          alt='avatar'
          src={userInfo?.photo_url || AvatarImage}
        />
        <div className={classNames(cls.block, {}, [])}>
          <h1 className={classNames(cls.name, {}, [])}>
            {userInfo?.username || ''}
          </h1>
          <div className={classNames(cls.code, {}, [])}>
            <p className={classNames(cls.id, {}, [])}>
              {`id: ${userInfo?.id || ''}`}
            </p>
            <button 
              onClick={handleClickToCopy} 
              className={classNames(cls.copy, {}, [])}
            >
              <img 
                className={classNames(cls.svg, {}, [])}
                alt='#'
                src={CopyIconSvg}
              />
            </button>
            <button className={classNames(cls.copy, {}, [])}></button>
          </div>
        </div>
      </div>
      {visibleTitle && <h2 className={classNames(cls.pageTitle, {}, [])}>{title}</h2>}
    </div>
  );
};
