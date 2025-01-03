import { classNames } from '@/utils/classNames/className';
import cls from './BuyCard.module.css';
import CoffeIcon from '@/assets/images/icons/business/coffe.svg';
import MoneyIcon from '@/assets/images/icons/Subtract.svg';
import ButtonSelect from '@/components/ButtonSelect/ButtonSelect';

interface IBuyCardData {
  className?: string;
}

export const BuyCard = ({ className }: IBuyCardData) => {
  return (
    <li className={classNames(cls.item, {}, [className || ''])}>
      <img 
        className={classNames(cls.image, {}, [])}
        alt='#'
        src={CoffeIcon}
      />
      <div className={classNames(cls.info, {}, [])}>
        <h3 className={classNames(cls.heading, {}, [])}>Кофейня</h3>
        <p className={classNames(cls.subtitle, {}, [])}>Доход в день:</p>
        <div className={classNames(cls.income, {}, [])}>
          <p className={classNames(cls.money)}>+500</p>
          <img 
            className={classNames(cls.icon, {}, [])}
            alt='#'
            src={MoneyIcon}
          />
        </div>
      </div>
      <div className={classNames(cls.buyInfo, {}, [])}>
        <div className={classNames(cls.buy, {}, [])}>
          <p className={classNames(cls.subtitle, {}, [])}>Цена:</p>
          <p className={classNames(cls.heading, {}, [])}>2500</p>
          <img 
            className={classNames(cls.icon, {}, [])}
            alt='#'
            src={MoneyIcon}
          />
        </div>
        <ButtonSelect isLight={false} title='Купить' />
      </div>
    </li>
  )
}