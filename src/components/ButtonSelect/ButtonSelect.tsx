import { classNames } from '@/utils/classNames/className';
import cls from './ButtonSelect.module.css';

interface IButtonSelectData {
  className?: string;
  title?: string;
  isLight: boolean;
  isSold: boolean;
  onClick?: () => void;
}

const ButtonSelect = ({ title, isLight, onClick, isSold }: IButtonSelectData) => {
  return (
    <button
      className={classNames(cls.button, { 
        [cls.light]: isLight,
        [cls.active]: isSold,
       }, [])}
      onClick={onClick}
    >
      {!isSold ?title : 'Куплено'}
    </button>
  );
};

export default ButtonSelect;
