import { classNames } from '@/utils/classNames/className';
import cls from './NewsBlock.module.css';
import BackgroundImage from '@/assets/images/background.png';
import MoneyImage from '@/assets/images/backBlock.png';

interface INewsBlock {
  className?: string;
  referals: number;
}

export const NewsBlock = ({ className, referals }: INewsBlock) => {
  return (
    <section className={classNames(cls.section, {}, [className || ''])}>
      <div className={classNames(cls.container, {}, [])}>
        <div className={classNames(cls.block, {}, [])}>
          <h2 className={classNames(cls.heading, {}, [])}>
            Приглашай друзей, чтобы стать еще счастливее!
          </h2>
          <p className={classNames(cls.subtitle, {}, [])}>
            За каждого реферала Вы будете получать бонус от 
            его заработка:
          </p>
          <div className={classNames(cls.background, {}, [])}>
            <img
              className={classNames(cls.elipse, {}, [])}
              alt='#'
              src={BackgroundImage}
            />
          </div>
          <div className={classNames(cls.bl, {}, [])}>
            <img 
              className={classNames(cls.imageInfo, {}, [])}
              src={MoneyImage}
            />
          </div>
        </div>
        <ul className={classNames(cls.list, {}, [])}>
          <li className={classNames(cls.item, {}, [])}>
            <h3 className={classNames(cls.head, {}, [])}>{referals}</h3>
            <p className={classNames(cls.text, {}, [])}>
              Ваши рефералы
            </p>
          </li>
          <li className={classNames(cls.item, {}, [])}>
            <h3 className={classNames(cls.head, {}, [])}>2.5%</h3>
            <p className={classNames(cls.text, {}, [])}>
              от доходов рефералов вашего реферала
            </p>
          </li>
        </ul>
      </div>
    </section>
  )
}