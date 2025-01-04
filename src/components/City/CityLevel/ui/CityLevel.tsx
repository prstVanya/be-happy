import { classNames } from '@/utils/classNames/className';
import InfoIcon from '@/assets/images/icons/infoIcon.svg';
import cls from './CityLevel.module.css';

interface ICityLevelData {
  className?: string;
  income: number;
  level: number;
}

export const CityLevel = ({ className, income, level }: ICityLevelData) => {
  return (
    <section className={classNames(cls.level, {}, [className || ''])}>
      <div className={classNames(cls.container, {}, [])}>
        <div className={classNames(cls.mainInfo, {}, [])}>
          <div className={classNames(cls.mylevel, {}, [])}>
            <h2 className={classNames(cls.title, {}, [])}>Мой квартал</h2>
            <p className={classNames(cls.lev, {}, [])}>{`Ур. ${level}`}</p>
          </div>
          <button className={classNames(cls.button, {}, [])}>
            <img
              className={classNames(cls.icon, {}, [cls.infoIcon])}
              alt='#'
              src={InfoIcon}
            />
          </button>
        </div>
          <ul className={classNames(cls.bonus, {}, [])}>
            <li className={classNames(cls.item, {}, [])}>
              <p className={classNames(cls.heading, {}, [])}>Доход в день:</p>
              <h3 className={classNames(cls.subtitle, {}, [])}>{income}</h3>
            </li>
            <li className={classNames(cls.item, {}, [])}>
              <p className={classNames(cls.heading, {}, [])}>Бонус к клику:</p>
              <h3 className={classNames(cls.subtitle, {}, [])}>+100</h3>
            </li>
            <li className={classNames(cls.item, {}, [])}>
              <p className={classNames(cls.heading, {}, [])}>{`Награда${'\u00A0'}заданий:`}</p>
              <h3 className={classNames(cls.subtitle, {}, [])}>+50%</h3>
            </li>
          </ul>
      </div>
    </section>
  );
};
