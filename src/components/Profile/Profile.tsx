import { classNames } from '@/utils/classNames/className';
import { UserInfo } from './UserInfo';
import { UserChoices } from './UserChoices';
import { SliderData } from './Slider';
import { PromoCodeSection } from './PromoCodeSection';
import { StageSection } from './StagesSection';
import { useState } from 'react';
import cls from './Profile.module.css';
import { PopupInfo } from '../PopupInfo';
import { Referal } from './Referal';

export const Profile = () => {
  const [popup, setPopup] = useState<boolean>(false);

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
