import { classNames } from '@/utils/classNames/className';
import LevelCity from '@/assets/images/level1.png';
import ButtonSelect from '@/components/ButtonSelect/ButtonSelect';
import cls from './FinanceLevel.module.css';

interface IFinanceLevel {
  className?: string;
}

export const FinanceLevel = ({ className }: IFinanceLevel) => {
  return (
    <section className={classNames(cls.finance, {}, [className || ''])}>
      <div className={classNames(cls.container, {}, [])}>
        <img
          className={classNames(cls.image, {}, [])}
          alt='Город'
          src={LevelCity}
        />
        <ButtonSelect isLight={false} title='Забрать доход' />
      </div>
    </section>
  );
};
