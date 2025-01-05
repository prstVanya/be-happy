import { classNames } from '@/utils/classNames/className';
import cls from './PriceInfo.module.css';
import MoneyIcon from '@/assets/images/icons/Subtract.svg';

interface IPriceInfoData {
  className?: string;
  building: {
    cost: number;
  } | null;
}

export const PriceInfo = ({ className, building }: IPriceInfoData) => {
  return (
    <div className={classNames(cls.price, {}, [className || ''])}>
      <p className={classNames(cls.heading, {}, [])}>Цена покупки: </p>
      <div className={classNames(cls.priceBlock, {}, [])}>
        <p className={classNames(cls.money)}>{building?.cost}</p>
        <img 
          className={classNames(cls.icon, {}, [])}
          alt='#'
          src={MoneyIcon}
        />
      </div>
    </div>
  )
}