import { classNames } from '@/utils/classNames/className';
import cls from './PopupInfo.module.css';
import ButtonSelect from '@/components/ButtonSelect/ButtonSelect';

interface IBonusPopupData {
  className?: string;
  isOpen: boolean;
  onClose: () => void;
}

export const PopupInfo = ({ className, isOpen, onClose }: IBonusPopupData) => {
  return (
    <div className={classNames(cls.popup, { [cls.open]: isOpen }, [className || ''])}>
      <div className={classNames(cls.container, {}, [])}>
        <div className={classNames(cls.info, {}, [])}>
          <h2 className={classNames(cls.heading, {}, [])}>Карта Debit</h2>
          <p className={classNames(cls.subtitle, {}, [])}>
            Это твоя карточка. Кликай на нее и получай лавэшку раз в час. 
            Доход с карты можно увеличить улучая уровень своего квартала. 
            С клика ваших рефералов по карте вы получаете 5% от их дохода.
          </p>
        </div>
        <ButtonSelect onClick={onClose} isLight={false} title='Ok' />
      </div>
    </div>
  )
}