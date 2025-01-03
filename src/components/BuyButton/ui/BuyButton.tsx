import { classNames } from '@/utils/classNames/className';
import cls from './BuyButton.module.css';

interface IButtonSelectData {
  className?: string;
  title?: string;
  isSold: boolean;
  onClick?: () => void;
}

const ButtonSelect = ({ title, onClick, isSold }: IButtonSelectData) => {
  return (
    <button
      className={classNames(cls.button, { [cls.active]: isSold }, [])}
      onClick={onClick}
    >
      {title}
    </button>
  );
};

export default ButtonSelect;
