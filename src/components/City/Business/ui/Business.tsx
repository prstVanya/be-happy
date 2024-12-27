import { classNames } from '@/utils/classNames/className';
import CoffeIcon from '@/assets/images/icons/business/coffe.svg';
import MoneyIcon from '@/assets/images/icons/Subtract.svg';
import ButtonSelect from '@/components/ButtonSelect/ButtonSelect';
import cls from './Business.module.css';

interface IBusinessData {
  className?: string;
}

export const Business = ({ className }: IBusinessData) => {
  return (
    <section className={classNames(cls.business, {}, [className || ''])}>
      <div className={classNames(cls.container, {}, [])}>
        <h2 className={classNames(cls.title, {}, [])}>Бизнесы</h2>
        <ul className={classNames(cls.list, {}, [])}>
          <li className={classNames(cls.item, {}, [])}>
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
        </ul>
      </div>
    </section>
  );
};
