import { classNames } from '@/utils/classNames/className';
import cls from './BuyButton.module.css';

interface IButtonSelectData {
  className?: string;
  isEarn: boolean;
  onClick?: () => void;
}

export const EarnButton = ({ onClick, isEarn }: IButtonSelectData) => {
  return (
    <button
      className={classNames(cls.button, { [cls.active]: isEarn }, [])}
      onClick={onClick}
    >

      {!isEarn ? 'Забрать доход' : 'Будет доступно завтра!'}
    </button>
  );
};
