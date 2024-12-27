import { classNames } from '@/utils/classNames/className';
import cls from './StagesSection.module.css';
import FirstStage from '@/assets/images/icons/stages/stagefirst.svg'

export const StageSection = () => {
  return (
    <section className={classNames(cls.stage, {}, [])}>
      <div className={classNames(cls.container, {}, [])}>
        <div className={classNames(cls.stage, {}, [])}>
            <img 
              alt='#'
              className={classNames(cls.image, {}, [])}
              src={FirstStage}
            />
        </div>
        <div className={classNames(cls.texts, {}, [])}>
          <p className={classNames(cls.text, {}, [])}>Раздача</p>
          <p className={classNames(cls.text, {}, [])}>Майнинг</p>
          <p className={classNames(cls.text, {}, [])}>NFT</p>
          <p className={classNames(cls.text, {}, [])}>Airdrop</p>
        </div>
      </div>
    </section>
  );
};
