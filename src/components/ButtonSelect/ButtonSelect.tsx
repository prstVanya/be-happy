import { classNames } from '@/utils/classNames/className';
import cls from './ButtonSelect.module.css';

interface IButtonSelectData {
  className?: string;
  title?: string;
  isLight: boolean;
  isSold: boolean;
  onClick?: () => void;
  isDisabled: boolean;
}

const ButtonSelect = ({ title, isLight, onClick, isSold, isDisabled }: IButtonSelectData) => {
  return (
    <button
      className={classNames(cls.button, { 
        [cls.light]: isLight,
        [cls.active]: isSold,
       }, [])}
      onClick={onClick}
      disabled={isDisabled}
    >
      {!isSold ?title : 'Куплено'}
    </button>
  );
};

export default ButtonSelect;
