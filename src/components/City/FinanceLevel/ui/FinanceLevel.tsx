import { classNames } from '@/utils/classNames/className';
import cls from './FinanceLevel.module.css';
import { EarnButton } from '@/components/BuyButton/ui/BuyButton';
import FirstLevel from '@/assets/images/level1.png';
import SecondLevel from '@/assets/images/levels/level2.png';
import ThirdLevel from '@/assets/images/levels/level3.png';
import FourthLevel from '@/assets/images/levels/level4.png';
import FiveLevel from '@/assets/images/levels/level5.png';
import SixLevel from '@/assets/images/levels/level6.png';

interface IFinanceLevel {
  className?: string;
  onSubmit: () => void;
  level: number;
  isBuilding: boolean;
}

export const FinanceLevel = ({ className, onSubmit, level, isBuilding }: IFinanceLevel) => {
  let levelImage: string;

  switch(level) {
    case 1:
      levelImage = FirstLevel; 
      break;
    case 2:
      levelImage = SecondLevel;
      break;
    case 3:
      levelImage = ThirdLevel;
      break;
    case 4:
      levelImage = FourthLevel;
      break;
    case 5:
      levelImage = FiveLevel;
      break;
    case 6:
      levelImage = SixLevel;
      break;
    default:
      levelImage = FirstLevel;
      break;
  }
  return (
    <section className={classNames(cls.finance, {}, [className || ''])}>
      <div className={classNames(cls.container, {}, [])}>
        <img
          className={classNames(cls.image, {}, [])}
          alt='Город'
          src={levelImage}
        />
        <EarnButton
          isBuilding={isBuilding}
          onClick={onSubmit} isEarn={false} 
        />
      </div>
    </section>
  );
};
