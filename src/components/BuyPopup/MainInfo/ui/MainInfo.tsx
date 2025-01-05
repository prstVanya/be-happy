import { classNames } from '@/utils/classNames/className';
import cls from './MainInfo.module.css';
import MoneyIcon from '@/assets/images/icons/Subtract.svg';

interface IMainInfoData {
  className?: string;
  building: {
    income: number;
    icon_url: string;
  } | null;
}

export const MainInfo = ({ className, building }: IMainInfoData) => {
  return (
    <div className={classNames(cls.mainInfo, {}, [className || ''])}>
      <img 
        className={classNames(cls.city, {}, [])}
        alt='#'
        src={building?.icon_url}
      />
      <div className={classNames(cls.info, {}, [])}>
        <div className={classNames(cls.money, {}, [])}>
          <p className={classNames(cls.subtitle, {}, [])}>Доход в день:</p>
          <div className={classNames(cls.income, {}, [])}>
            <p className={classNames(cls.moneyText)}>{building?.income}</p>
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