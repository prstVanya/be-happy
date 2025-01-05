import { classNames } from '@/utils/classNames/className';
import { UserInfo } from './UserInfo';
import { UserChoices } from './UserChoices';
import { SliderData } from './Slider';
import { PromoCodeSection } from './PromoCodeSection';
import { StageSection } from './StagesSection';
import { useState, useEffect } from 'react';
import cls from './Profile.module.css';
import { PopupInfo } from '../PopupInfo';
import { Referal } from './Referal';
import { userApi } from '@/Api/UserApi';

export const Profile = () => {
  const [popup, setPopup] = useState<boolean>(false);
  const queryParams = new URLSearchParams(location.search);
  const referId = queryParams.get('tgWebAppStartParam');

  console.log(referId);

  const handleAddReferal = async () => {
    const num = Number(referId);
    try {
      if (num.toString() === 'NaN') return;
      const res = await userApi.addReferal(num);
      return res;
    } catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {
    if (referId) {
      handleAddReferal();
    }
  }, [referId]);

  const handleOpenPopup = () => {
    setPopup((prev) => !prev);
  };

  const handleClosePopup = () => {
    setPopup(false);
  };
  return (
    <main className={classNames(cls.main, {}, [])}>
      <div className={classNames(cls.content, {}, [])}>
        <PopupInfo isOpen={popup} onClose={handleClosePopup}  />
        <UserInfo 
          visibleTitle={false}
        />
        <UserChoices />
        <SliderData 
          onOpen={handleOpenPopup}
        />
        <PromoCodeSection />
        <Referal />
        <StageSection />
      </div>
    </main>
  );
};
