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
  onClose: (evt: React.MouseEvent) => void;
  building: {
    id: number;
    name: string;
    income: number;
    cost: number;
    icon_url: string;
  } | null;
  balance: {
    balance: number;
  };
  handleBuy: (building: { id: number }) => void;
}

export const BuyPopup = ({ 
  className, isOpen, onClose, building, balance, handleBuy
}: IBuyPopupData) => {

  const handleSubmit = (evt: React.FormEvent) => {
    evt.preventDefault();
    if (building) {
      handleBuy({ id: building.id });
    }
  }
  return (
    <div className={classNames(cls.popup, { [cls.open]: isOpen }, [className || ''])}>
      <form onSubmit={handleSubmit} className={classNames(cls.container, {}, [])}>
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
        <ButtonSelect isDisabled={false} isSold={false} isLight={false} title='Купить' />
      </form>
    </div>
  )
}