import { classNames } from '../../../../utils/classNames/className';
import CardOne from '@/assets/images/cards/card1.jpeg';
import CardTwo from '@/assets/images/cards/card2.jpeg';
import CardThree from '@/assets/images/cards/card3.png';
import LeftIcon from '@/assets/images/icons/leftIconActive.svg';
import RightIcon from '@/assets/images/icons/rightIconActive.svg';
import InfoIcon from '@/assets/images/icons/infoIcon.svg';
import cls from './Slider.module.css';

export const Slider = () => {
  return (
    <section className={classNames(cls.slider, {}, [])}>
      <div className={classNames(cls.container, {}, [])}>
        <ul className={classNames(cls.list, {}, [])}>
          <li className={classNames(cls.card, {}, [])}>
            <div className={classNames(cls.imageWrap, {}, [])}>
              <img
                className={classNames(cls.image, {}, [])}
                alt='карточка'
                src={CardOne}
              />
            </div>
          </li>
          <li className={classNames(cls.card, {}, [])}>
            <div className={classNames(cls.imageWrap, {}, [])}>
              <img
                className={classNames(cls.image, {}, [])}
                alt='карточка'
                src={CardTwo}
              />
            </div>
          </li>
          <li className={classNames(cls.card, {}, [])}>
            <div className={classNames(cls.imageWrap, {}, [])}>
              <img
                className={classNames(cls.image, {}, [])}
                alt='карточка'
                src={CardThree}
              />
            </div>
          </li>
        </ul>
        <div className={classNames(cls.buttons, {}, [])}>
          <button className={classNames(cls.button, {}, [])}>
            <img
              className={classNames(cls.icon, {}, [])}
              alt='#'
              src={LeftIcon}
            />
          </button>
          <div className={classNames(cls.info, {}, [])}>
            <p className={classNames(cls.text, {}, [])}>Мои карты</p>
            <button className={classNames(cls.button, {}, [])}>
              <img
                className={classNames(cls.icon, {}, [cls.infoIcon])}
                alt='#'
                src={InfoIcon}
              />
            </button>
          </div>
          <button className={classNames(cls.button, {}, [])}>
            <img
              className={classNames(cls.icon, {}, [])}
              alt='#'
              src={RightIcon}
            />
          </button>
        </div>
      </div>
    </section>
  );
};
