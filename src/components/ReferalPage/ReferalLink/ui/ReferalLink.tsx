import { classNames } from '@/utils/classNames/className';
import cls from './ReferalLink.module.css';

interface IReferalLink {
  className?: string;
  link: string;
}

export const ReferalLink = ({ className, link }: IReferalLink) => {
  return (
    <section className={classNames(cls.section, {}, [className || ''])}>
      <div className={classNames(cls.container, {}, [])}>
        <div className={classNames(cls.block, {}, [])}>
          <h2 className={classNames(cls.heading, {}, [])}>Ваша реферальная ссылка</h2>
          <p className={classNames(cls.heading, {}, [])}>{link}</p>
          <p className={classNames(cls.heading, {}, [])}>1 реф бал</p>
        </div>
      </div>
    </section>
  )
}