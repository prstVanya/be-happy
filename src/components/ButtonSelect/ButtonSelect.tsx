import { classNames } from '@/utils/classNames/className';
import cls from './ButtonSelect.module.css';

interface IButtonSelectData {
  className?: string;
  title?: string;
  isLight: boolean;
  onClick?: () => void;
}

const ButtonSelect = ({ title, isLight, onClick }: IButtonSelectData) => {
  return (
    <button
      className={classNames(cls.button, { [cls.light]: isLight }, [])}
      onClick={onClick}
    >
      {title}
    </button>
  );
};

export default ButtonSelect;
