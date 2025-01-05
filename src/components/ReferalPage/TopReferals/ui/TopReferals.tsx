import { classNames } from '@/utils/classNames/className';
import cls from './TopReferal.module.css';
import CopyIconSvg from '@/assets/images/icons/copy.svg';
import { useSelector } from 'react-redux';
import { IReferalsData } from '@/types';

interface ITopReferal {
  className?: string;
}

export const TopReferal = ({ className }: ITopReferal) => {
  const referrals = useSelector((state: any) => state.user.referrals);

  return (
    <section className={classNames(cls.section, {}, [className || ''])}>
      <div className={classNames(cls.container, {}, [])}>
        <div className={classNames(cls.titles, {}, [])}>
          <h2 className={classNames(cls.heading, {}, [])}>Топ рефералов</h2>
          <p className={classNames(cls.subtitle, {}, [])}>За последние 7 дней</p>
        </div>
        <ul className={classNames(cls.list, {}, [])}>
          {referrals.length > 0 ? (
            referrals.map((referral: IReferalsData) => (
              <li key={referral.user_id} className={classNames(cls.item, {}, [])}>
                <div className={classNames(cls.block, {}, [])}>
                  <h1 className={classNames(cls.name, {}, [])}>
                    {referral.fristname}
                  </h1>
                  <div className={classNames(cls.code, {}, [])}>
                    <p className={classNames(cls.id, {}, [])}>
                      id: {referral.user_id}
                    </p>
                    <button
                      className={classNames(cls.copy, {}, [])}
                    >
                      <img
                        className={classNames(cls.svg, {}, [])}
                        alt="#"
                        src={CopyIconSvg}
                      />
                    </button>
                  </div>
                </div>
                <p className={classNames(cls.referalcCount, {}, [])}>
                  {referral.referals}
                </p>
              </li>
            ))
          ) : (
            <li className={classNames(cls.noReferrals, {}, [])}>
              Нет доступных рефералов.
            </li>
          )}
        </ul>
      </div>
    </section>
  )
}