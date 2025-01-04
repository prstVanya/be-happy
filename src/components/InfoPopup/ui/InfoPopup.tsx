import { classNames } from '@/utils/classNames/className';
import cls from './InfoPopup.module.css';

interface IInfoPopup {
  className?: string;
  title: string;
  isOpen: boolean;
}

export const InfoPopup = ({ className, isOpen, title }: IInfoPopup) => {
  return (
    <div className={classNames(cls.popup, {[cls.open]: isOpen}, [className || ''])}>
      <h2 className={classNames(cls.error, {}, [])}>
        {title}
      </h2>
    </div>
  )
}