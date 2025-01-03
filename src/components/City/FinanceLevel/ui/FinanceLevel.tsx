import { classNames } from '@/utils/classNames/className';
import LevelCity from '@/assets/images/level1.png';
import cls from './FinanceLevel.module.css';
import { EarnButton } from '@/components/BuyButton/ui/BuyButton';

interface IFinanceLevel {
  className?: string;
  onSubmit: () => void;
}

export const FinanceLevel = ({ className, onSubmit}: IFinanceLevel) => {
  return (
    <section className={classNames(cls.finance, {}, [className || ''])}>
      <div className={classNames(cls.container, {}, [])}>
        <img
          className={classNames(cls.image, {}, [])}
          alt='Город'
          src={LevelCity}
        />
        <EarnButton onClick={onSubmit} isEarn={false} />
      </div>
    </section>
  );
};
