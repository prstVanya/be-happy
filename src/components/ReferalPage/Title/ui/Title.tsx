import { classNames } from '@/utils/classNames/className';
import cls from './Title.module.css';
import ArrowLeft from '@/assets/images/icons/ArrowLeft.svg';
import { useNavigate } from 'react-router-dom';

interface ITitle {
  className?: string;
}

export const Title = ({ className }: ITitle) => {
  const navigate = useNavigate();
  const handleToLink = () => {
    navigate('/profile');
  }

  return (
    <section className={classNames(cls.section, {}, [className || ''])}>
      <div className={classNames(cls.container, {}, [])}>
        <button 
          className={classNames(cls.button, {}, [])}
          onClick={handleToLink}
        >
          <img 
            className={classNames(cls.svg, {}, [])}
            alt='#'
            src={ArrowLeft}
          />
        </button>
        <h2 className={classNames(cls.title, {}, [])}>Реферальная система</h2>
      </div>
    </section>
  )
}