import { classNames } from '@/utils/classNames/className';
import cls from './ButtonSelect.module.css';

interface IButtonSelectData {
  className?: string;
  title?: string;
  isLight: boolean;
}

const ButtonSelect = ({ title, isLight }: IButtonSelectData) => {
  return (
    <button
      className={classNames(cls.button, { [cls.light]: isLight }, [])}
    >
      {title}
    </button>
  );
};

export default ButtonSelect;
