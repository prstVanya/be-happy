import { classNames } from '@/utils/classNames/className';
import cls from './BuyButton.module.css';

interface IButtonSelectData {
  className?: string;
  isEarn: boolean;
  onClick?: () => void;
  isBuilding: boolean;
}

export const EarnButton = ({ onClick, isEarn, isBuilding }: IButtonSelectData) => {
  return (
    <button
      className={classNames(cls.button, { 
        [cls.active]: isEarn,
        [cls.disabled]: isBuilding,
       }, [])}
      onClick={onClick}
      disabled={isBuilding}
    >

      {!isEarn ? 'Забрать доход' : 'Будет доступно завтра!'}
    </button>
  );
};
