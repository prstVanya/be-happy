import { classNames } from '@/utils/classNames/className';
import TelegramIcon from '@/assets/images/icons/bonus/teleg_icon.svg';
import MoneyIcon from '@/assets/images/icons/Subtract.svg';
import TimeIcon from '@/assets/images/icons/bonus/time_icon.svg';
import StatusIcon from '@/assets/images/icons/bonus/status_task.svg';
import cls from './BonusTask.module.css';

interface IBonusTaskData {
  className?: string;
  onOpen: () => void;
}

export const BonusTask = ({ className, onOpen }: IBonusTaskData) => {
  return (
    <section className={classNames(cls.task, {}, [className || ''])}>
      <div className={classNames(cls.container, {}, [])}>
        <h2 className={classNames(cls.title, {}, [])}>Задания</h2>
        <ul className={classNames(cls.list, {}, [])}>
          <li className={classNames(cls.card, {}, [])}>
            <button onClick={onOpen} className={classNames(cls.button, {}, [])}>
              <div className={classNames(cls.main, {}, [])}>
                <img
                  className={classNames(cls.imageTask, {}, [])}
                  alt='#'
                  src={TelegramIcon}
                />
                <div className={classNames(cls.info, {}, [])}>
                  <h3 className={classNames(cls.heading, {}, [])}>Задание от пртнера</h3>
                  <div className={classNames(cls.money, {}, [])}>
                    <p className={classNames(cls.subtitle, {}, [])}>+1 000 000</p>
                    <img
                      className={classNames(cls.icon, {}, [])}
                      alt='#'
                      src={MoneyIcon}
                    />
                  </div>
                  <div className={classNames(cls.time, {}, [])}>
                    <img
                      className={classNames(cls.timeIcon, {}, [])}
                      alt='#'
                      src={TimeIcon}
                    />
                    <p className={classNames(cls.before, {}, [])}>До: 15.08</p>
                  </div>
                </div>
              </div>
              <img
                className={classNames(cls.status, {}, [])}
                alt='#'
                src={StatusIcon}
              />
            </button>
          </li>
        </ul>
      </div>
    </section>
  );
};
