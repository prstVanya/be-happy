import { classNames } from '@/utils/classNames/className';
import cls from './BackgroundCity.module.css';
import BackgroundImage from '@/assets/images/background.png';

export const BackgroundCity = () => {
  return (
    <div className={classNames(cls.background, {}, [])}>
      <img
        className={classNames(cls.image, {}, [])}
        alt='#'
        src={BackgroundImage}
      />
    </div>
  );
};
