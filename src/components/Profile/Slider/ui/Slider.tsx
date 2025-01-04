import React from 'react';
import { classNames } from '../../../../utils/classNames/className';
import CardOne from '@/assets/images/cards/card1.jpeg';
import CardTwo from '@/assets/images/cards/card2.jpeg';
import CardThree from '@/assets/images/cards/card3.png';
import LeftIcon from '@/assets/images/icons/leftIconActive.svg';
import RightIcon from '@/assets/images/icons/rightIconActive.svg';
import InfoIcon from '@/assets/images/icons/infoIcon.svg';
import MoneyIcon from '@/assets/images/icons/Subtract.svg';
import MoneyBlackIcon from '@/assets/images/icons/Subtract_black.svg';
import cls from './Slider.module.css';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { useState, useRef, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { userApi } from '@/Api/UserApi';
import { setUserBalanceAction, setTimerAction } from '@/store/Slice/userSlice';
import { InfoPopup } from '@/components/InfoPopup';

interface ISliderData {
  className?: string;
  onOpen: () => void;
}

export const SliderData = ({ className, onOpen }: ISliderData) => {
  const balance = useSelector((state: any) => state.user.balance);
  const timer = useSelector((state: any) => state.user.timer);
  const dailyReward = useSelector((state: any) => state.user.dailyReward);
  const dispatch = useDispatch();
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isInfoPopup, setIsInfoPopup] = useState(false);
  const [isTextInfoPopup, setIsTextInfoPopup] = useState('');
  const isLastSlide = currentSlide === 2;
  const isFirstSlide = currentSlide === 0;
  const sliderRef = useRef<Slider | null>(null);

  const getStoredTime = () => {
    const storedTime = localStorage.getItem('remainingTime');
    return storedTime ? parseInt(storedTime, 10) : timer;
  };

  const [remainingTime, setRemainingTime] = useState<number>(getStoredTime());

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;
    if (remainingTime > 0) {
      interval = setInterval(() => {
        setRemainingTime((prevTime: number) => {
          const newTime = prevTime - 1;
          localStorage.setItem('remainingTime', newTime.toString());
          return newTime;
        });
      }, 1000);
    } else {
      localStorage.removeItem('remainingTime');
      if (interval) {
        clearInterval(interval);
      }
    }
    return () => {
      if (interval) {
        clearInterval(interval);
      }
    };
  }, [remainingTime]);

  useEffect(() => {
    dispatch(setTimerAction(remainingTime));
  }, [remainingTime, dispatch]);

  const settings = {
    infinite: false,
    speed: 300,
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

  const handleClickToEarn = async () => {
    try {
      const data = await userApi.earnCard();
      if (data.balance) {
        dispatch(setUserBalanceAction(data));
        const newTime = 3600;
        setRemainingTime(newTime);
        localStorage.setItem('remainingTime', newTime.toString());
        setRemainingTime(3600);
        setIsTextInfoPopup('Награда собрана!');
        setIsInfoPopup(true);

        setTimeout(() => {
          setIsInfoPopup(false);
          setIsTextInfoPopup('');
        }, 4000);
      }
    } catch (err) {
      console.log(err);
      setIsTextInfoPopup(`Ошибка ${err}`);
        setIsInfoPopup(true);

        setTimeout(() => {
          setIsInfoPopup(false);
          setIsTextInfoPopup('');
        }, 4000);
    }
  }

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${minutes}:${secs < 10 ? '0' : ''}${secs}`;
  };

  return (
    <section 
      onClick={handleMouseDown}
      className={classNames(cls.slider, {}, [className || ''])}
    >
      <div className={classNames(cls.container, {}, [])}>
        <InfoPopup title={isTextInfoPopup} isOpen={isInfoPopup} />
        <Slider 
          className={classNames(cls.slide, {}, [])} 
          ref={sliderRef} 
          {...settings}
        >
          <button 
            onClick={handleClickToEarn} 
            className={classNames(cls.card, {}, [])}
            disabled={remainingTime > 0}
          >
            <div className={classNames(cls.imageWrap, {}, [])}>
              <div className={classNames(cls.cardInfoWrap, {}, [])}>
                <div className={classNames(cls.cardInfo, {}, [])}>
                  <p className={classNames(cls.money, {}, [])}>{balance.balance.toLocaleString()}</p>
                  <img 
                    className={classNames(cls.ic, {}, [])}
                    alt='#'
                    src={MoneyIcon}
                  />
                </div>
                <button className={classNames(cls.time, {}, [])}>
                  <p className={classNames(cls.sub, {}, [])}>Next Click</p>
                  {remainingTime > 0 ? (
                    <p className={classNames(cls.ready, {}, [])}>{formatTime(remainingTime)}</p>
                  ) : (
                    <p className={classNames(cls.ready, {}, [])}>ready</p>
                  )}
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
                  <p className={classNames(cls.money, {}, [cls.black])}>{dailyReward}</p>
                  <img 
                    className={classNames(cls.ic, {}, [])}
                    alt='#'
                    src={MoneyBlackIcon}
                  />
                </div>
                <button className={classNames(cls.time, {}, [cls.black])}>
                  <p className={classNames(cls.sub, {}, [cls.black])}>Next Click</p>
                  <p className={classNames(cls.ready, {}, [cls.black])}>ready</p>
                </button>
              </div>
              <img
                className={classNames(cls.image, {}, [])}
                alt='карточка'
                src={CardThree}
              />
            </div>
          </button>
          <button className={classNames(cls.card, {}, [])}>
            <div className={classNames(cls.imageWrap, {}, [])}>
            <div className={classNames(cls.cardInfoWrap, {}, [])}>
                <div className={classNames(cls.cardInfo, {}, [])}>
                  <p className={classNames(cls.money, {}, [])}>0</p>
                  <img 
                    className={classNames(cls.ic, {}, [])}
                    alt='#'
                    src={MoneyIcon}
                  />
                </div>
              </div>
              <img
                className={classNames(cls.image, {}, [])}
                alt='карточка'
                src={CardTwo}
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
