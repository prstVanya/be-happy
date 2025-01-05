import { classNames } from '@/utils/classNames/className';
import cls from './Referal.module.css';
import ReferalSvg from '@/assets/images/icons/referal.svg';
import ArrowSvg from '@/assets/images/icons/Arrow.svg';
import { useNavigate } from 'react-router-dom';

interface IReferalData {
  className?: string;
}
export const Referal = ({ className }: IReferalData) => {
  const navigate = useNavigate();

  const handleNavigate = () => {
    navigate('/referal');
  }

  return (
    <div className={classNames(cls.referal, {}, [className || ''])}>
      <div className={classNames(cls.info, {}, [])}>
        <img
          className={classNames(cls.image, {}, [])}
          alt='Рефералка'
          src={ReferalSvg}
        />
        <p className={classNames(cls.heading, {}, [])}>Реферальная система</p>
      </div>
      <button onClick={handleNavigate} className={classNames(cls.button, {}, [])}>
        <img 
          className={classNames(cls.svg, {}, [])}
          alt='Стрела ссылка'
          src={ArrowSvg}
        />
      </button>
    </div>
  )
}