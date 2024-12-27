import { classNames } from '@/utils/classNames/className';
import { UserInfo } from '../Profile/UserInfo';
import { BonusTask } from './BonusTask';
import { BonusPopup } from './BonusPopup';
import { useState } from 'react';
import cls from './Bonus.module.css';

interface IBonusData {
  className?: string;
}

export const Bonus = ({ className }: IBonusData) => {
  const [popup, setPopup] = useState<boolean | null>(false);

  const handleOpenPopup = () => {
    setPopup((prev) => !prev);
  };

  const handleClosePopup = () => {
    setPopup(null);
  };

  return (
    <main className={classNames(cls.bonus, {}, [className || ''])}>
      <div className={classNames(cls.container, {}, [])}>
        <BonusPopup
          onClose={handleClosePopup}
          isOpen={popup} />
        <UserInfo
          visibleTitle={true}
          title='Бонусы'
        />
        <BonusTask
          onOpen={handleOpenPopup} />
      </div>
    </main>
  );
};
