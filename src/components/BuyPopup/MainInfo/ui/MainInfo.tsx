import { classNames } from '@/utils/classNames/className';
import cls from './MainInfo.module.css';
import CoffeIcon from '@/assets/images/icons/business/coffe.svg';
import MoneyIcon from '@/assets/images/icons/Subtract.svg';

interface IMainInfoData {
  className?: string;
}

export const MainInfo = ({ className }: IMainInfoData) => {
  return (
    <div className={classNames(cls.mainInfo, {}, [className || ''])}>
      <img 
        className={classNames(cls.city, {}, [])}
        alt='#'
        src={CoffeIcon}
      />
      <div className={classNames(cls.info, {}, [])}>
        <div className={classNames(cls.money, {}, [])}>
          <p className={classNames(cls.subtitle, {}, [])}>Доход в день:</p>
          <div className={classNames(cls.income, {}, [])}>
            <p className={classNames(cls.moneyText)}>+500</p>
            <img 
              className={classNames(cls.icon, {}, [])}
              alt='#'
              src={MoneyIcon}
            />
          </div>
        </div>
        <div className={classNames(cls.buyInfo, {}, [])}>
          <div className={classNames(cls.buy, {}, [])}>
            <p className={classNames(cls.subtitle, {}, [])}>Уровень квартала</p>
            <p className={classNames(cls.moneyText, {}, [])}>+1</p>
          </div>
        </div>
      </div>
    </div>
  )
}