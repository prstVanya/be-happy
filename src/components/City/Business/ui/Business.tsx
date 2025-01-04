import { classNames } from '@/utils/classNames/className';
import MoneyIcon from '@/assets/images/icons/Subtract.svg';
import ButtonSelect from '@/components/ButtonSelect/ButtonSelect';
import cls from './Business.module.css';

interface IBusinessData {
  className?: string;
  buildings: Array<{
    id: number;
    image: string;
    name: string;
    income: number;
    levelRequirement: number;
    isAccessible: boolean;
  }>
  onBuyClick: (building: any) => void;
  userId: number;
}


export const Business = ({ className, buildings, onBuyClick, userId }: IBusinessData) => {
  return (
    <section className={classNames(cls.business, {}, [className || ''])}>
      <div className={classNames(cls.container, {}, [])}>
        <h2 className={classNames(cls.title, {}, [])}>Бизнесы</h2>
        <ul className={classNames(cls.list, {}, [])}>
          {buildings.map((w: any) => {
            const isSold = w.user_id === userId;
            const isLevelTooLow = !w.isAccessible;

            return (
              <li key={w.id} className={classNames(cls.item, {[cls.dark]: isLevelTooLow}, [])}>
                <img 
                  className={classNames(cls.image, {}, [])}
                  alt='#'
                  src={w.icon_url}
                />
                <div className={classNames(cls.info, {}, [])}>
                  <h3 className={classNames(cls.heading, {}, [])}>{w.name}</h3>
                  <p className={classNames(cls.subtitle, {}, [])}>{`Доход${'\u00A0'}в${'\u00A0'}день:`}</p>
                  <div className={classNames(cls.income, {}, [])}>
                    <p className={classNames(cls.money)}>{`+${w.income}`}</p>
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
                    <p className={classNames(cls.heading, {}, [])}>{w.cost}</p>
                    <img 
                      className={classNames(cls.icon, {}, [])}
                      alt='#'
                      src={MoneyIcon}
                    />
                  </div>
                  <ButtonSelect 
                    isSold={isSold}
                    onClick={() => {
                      if (!isSold && w.isAccessible) {
                        onBuyClick(w);
                      }
                    }}
                    isLight={false}
                    isDisabled={isSold}
                    title='Купить' 
                  />
                </div>
              </li>
            )
          })}
        </ul>
      </div>
    </section>
  );
};
