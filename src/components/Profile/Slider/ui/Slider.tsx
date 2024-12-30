import React from 'react';
import { classNames } from '../../../../utils/classNames/className';
import CardOne from '@/assets/images/cards/card1.jpeg';
import CardTwo from '@/assets/images/cards/card2.jpeg';
import CardThree from '@/assets/images/cards/card3.png';
import LeftIcon from '@/assets/images/icons/leftIconActive.svg';
import RightIcon from '@/assets/images/icons/rightIconActive.svg';
import InfoIcon from '@/assets/images/icons/infoIcon.svg';
import MoneyIcon from '@/assets/images/icons/Subtract.svg';
import cls from './Slider.module.css';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { useState, useRef } from 'react';

interface ISliderData {
  className?: string;
  onOpen: () => void;
}

export const SliderData = ({ className, onOpen }: ISliderData) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const isLastSlide = currentSlide === 2;
  const isFirstSlide = currentSlide === 0;
  const sliderRef = useRef<Slider | null>(null);

  const settings = {
    infinite: false,
    speed: 400,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    focusOnSelect: true,
    centerPadding: '15px',
    draggable: false,
    swipe: false,
    afterChange: (index: number) => setCurrentSlide(index),
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    if (e.button === 2) {
      const direction = e.clientX > window.innerWidth / 2 ? 1 : -1;
      sliderRef.current?.slickGoTo(currentSlide + direction);
    }
  };

  return (
    <section 
      onClick={handleMouseDown}
      className={classNames(cls.slider, {}, [className || ''])}
    >
      <div className={classNames(cls.container, {}, [])}>
        <Slider ref={sliderRef} {...settings}>
          <button className={classNames(cls.card, {}, [])}>
            <div className={classNames(cls.imageWrap, {}, [])}>
              <div className={classNames(cls.cardInfoWrap, {}, [])}>
                <div className={classNames(cls.cardInfo, {}, [])}>
                  <p className={classNames(cls.money, {}, [])}>1 000 000</p>
                  <img 
                    className={classNames(cls.ic, {}, [])}
                    alt='#'
                    src={MoneyIcon}
                  />
                </div>
                <button className={classNames(cls.time, {}, [])}>
                  <p className={classNames(cls.sub, {}, [])}>Next Click</p>
                  <p className={classNames(cls.ready, {}, [])}>ready</p>
                </button>
              </div>
              <img
                className={classNames(cls.image, {}, [])}
                alt='карточка'
                src={CardOne}
              />
            </div>
          </button>
          <button className={classNames(cls.card, {}, [])}>
            <div className={classNames(cls.imageWrap, {}, [])}>
            <div className={classNames(cls.cardInfoWrap, {}, [])}>
                <div className={classNames(cls.cardInfo, {}, [])}>
                  <p className={classNames(cls.money, {}, [])}>1 000 000</p>
                  <img 
                    className={classNames(cls.ic, {}, [])}
                    alt='#'
                    src={MoneyIcon}
                  />
                </div>
                <button className={classNames(cls.time, {}, [])}>
                  <p className={classNames(cls.sub, {}, [])}>Next Click</p>
                  <p className={classNames(cls.ready, {}, [])}>ready</p>
                </button>
              </div>
              <img
                className={classNames(cls.image, {}, [])}
                alt='карточка'
                src={CardTwo}
              />
            </div>
          </button>
          <button className={classNames(cls.card, {}, [])}>
            <div className={classNames(cls.imageWrap, {}, [])}>
            <div className={classNames(cls.cardInfoWrap, {}, [])}>
                <div className={classNames(cls.cardInfo, {}, [])}>
                  <p className={classNames(cls.money, {}, [])}>1 000 000</p>
                  <img 
                    className={classNames(cls.ic, {}, [])}
                    alt='#'
                    src={MoneyIcon}
                  />
                </div>
                <button className={classNames(cls.time, {}, [])}>
                  <p className={classNames(cls.sub, {}, [])}>Next Click</p>
                  <p className={classNames(cls.ready, {}, [])}>ready</p>
                </button>
              </div>
              <img
                className={classNames(cls.image, {}, [])}
                alt='карточка'
                src={CardThree}
              />
            </div>
          </button>
        </Slider>
        <div className={classNames(cls.buttons, {}, [])}>
          <button 
            className={classNames(cls.button, {}, [])}
            onClick={() => sliderRef.current?.slickPrev()}
          >
            <img
              className={classNames(cls.icon, { [cls.disabled]: isFirstSlide }, [])}
              alt='#'
              src={LeftIcon}
            />
          </button>
          <div className={classNames(cls.info, {}, [])}>
            <p className={classNames(cls.text, {}, [])}>Мои карты</p>
            <button onClick={onOpen} className={classNames(cls.button, {}, [])}>
              <img
                className={classNames(cls.icon, {}, [cls.infoIcon])}
                alt='#'
                src={InfoIcon}
              />
            </button>
          </div>
          <button 
            className={classNames(cls.button, {}, [])}
            onClick={() => sliderRef.current?.slickNext()}
          >
            <img
              className={classNames(cls.icon, { [cls.disabled]: isLastSlide}, [])}
              alt='#'
              src={RightIcon}
            />
          </button>
        </div>
      </div>
    </section>
  );
};
