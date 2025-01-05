import { classNames } from '@/utils/classNames/className';
import CloseIcon from '@/assets/images/icons/close_icon.svg';
import MoneyIcon from '@/assets/images/icons/Subtract.svg';
import ButtonSelect from '@/components/ButtonSelect/ButtonSelect';
import cls from './BonusPopup.module.css';

interface IBonusPopupData {
  className?: string;
  isOpen: boolean;
  onClose: () => void;
}

export const BonusPopup = ({ className, isOpen, onClose }: IBonusPopupData) => {
  return (
    <div className={classNames(cls.popup, { [cls.open]: isOpen }, [className || ''])}>
      <div className={classNames(cls.container, {}, [])}>
        <div className={classNames(cls.modul, {}, [])}>
          <h2 className={classNames(cls.heading, {}, [])}>Задание</h2>
          <button
            onClick={onClose}
            className={classNames(cls.close, {}, [])}
          >
            <img
              className={classNames(cls.closeI, {}, [])}
              alt='#'
              src={CloseIcon}
            />
          </button>
        </div>
        <div className={classNames(cls.block, {}, [])}></div>
        <div className={classNames(cls.mainInfo, {}, [])}>
          <p className={classNames(cls.subtitle, {}, [])}>
            Подпишитесь на телеграмм канал нашего партера: Массажный салон
            “Все вдрочено”.
          </p>
          <div className={classNames(cls.money, {}, [])}>
            <p className={classNames(cls.some, {}, [])}>Награда</p>
            <div className={classNames(cls.quest, {}, [])}>
              <p className={classNames(cls.t, {}, [])}>500</p>
              <img 
                className={classNames(cls.icon, {}, [])}
                alt='#'
                src={MoneyIcon}
              />
            </div>
          </div>
          <div className={classNames(cls.buttons, {}, [])}>
            <ButtonSelect isDisabled={false} isSold={false} isLight={true} title='Приступить' />
            <ButtonSelect isDisabled={false} isSold={false} isLight={false} title='Проверить' />
          </div>
        </div>
      </div>
    </div>
  );
};
