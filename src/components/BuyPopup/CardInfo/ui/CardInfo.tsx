import { classNames } from '@/utils/classNames/className';
import cls from './CardInfo.module.css';
import DebitCardSvg from '@/assets/images/icons/cards/debitCard.svg';
import MoneyIcon from '@/assets/images/icons/Subtract.svg';

interface ICardInfo {
  className?: string;
  balance: number; 
}

export const CardInfo = ({ className, balance }: ICardInfo) => {
  return (
    <div className={classNames(cls.block, {}, [className || ''])}>
      <div className={classNames(cls.card, {}, [])}>
        <p className={classNames(cls.subtitle, {}, [])}>Счет:</p>
        <div className={classNames(cls.info, {}, [])}>
          <img 
            className={classNames(cls.icon, {}, [])}
            alt='#'
            src={DebitCardSvg}
          />
          <p className={classNames(cls.bl, {}, [])}>Debit Card</p>
        </div>
      </div>
      <div className={classNames(cls.card, {}, [])}>
        <p className={classNames(cls.subtitle, {}, [])}>Текущий баланс</p>
        <div className={classNames(cls.info, {}, [])}>
          <p className={classNames(cls.bl, {}, [])}>{balance.balance.toLocaleString()}</p>
          <img 
            className={classNames(cls.icon, {}, [])}
            alt='#'
            src={MoneyIcon}
          />
        </div>
      </div>
    </div>
  )
}