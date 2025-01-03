import { classNames } from '@/utils/classNames/className';
import cls from './BuyPopup.module.css';
import CloseIcon from '@/assets/images/icons/close_icon.svg';
import ButtonSelect from '@/components/ButtonSelect/ButtonSelect';
import { MainInfo } from './MainInfo';
import { CardInfo } from './CardInfo';
import { PriceInfo } from './PriceInfo';

interface IBuyPopupData {
  className?: string;
  isOpen: boolean;
  onClose: () => void;
  building: {
    id: string;
    image: string;
    name: string;
    income: number;
    cost: number;
  } | null;
  balance: number;
}

export const BuyPopup = ({ className, isOpen, onClose, building, balance }: IBuyPopupData) => {
  return (
    <div className={classNames(cls.popup, { [cls.open]: isOpen }, [className || ''])}>
      <div className={classNames(cls.container, {}, [])}>
        <div className={classNames(cls.modul, {}, [])}>
        <h2 className={classNames(cls.heading, {}, [])}>{building?.name}</h2>
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
        <MainInfo
          building={building}
        />
        <CardInfo 
          balance={balance}
        />
        <PriceInfo
          building={building}
        />
        <ButtonSelect isLight={false} title='Купить' />
      </div>
    </div>
  )
}