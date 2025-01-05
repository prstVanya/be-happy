import { classNames } from '@/utils/classNames/className';
import cls from './CardReferal.module.css';
import CopyIconSvg from '@/assets/images/icons/copy.svg';

export const CardReferal = () => {
  return (
    <li className={classNames(cls.item, {}, [])}>
      <div className={classNames(cls.block, {}, [])}>
        <h1 className={classNames(cls.name, {}, [])}>
          username
        </h1>
        <div className={classNames(cls.code, {}, [])}>
          <p className={classNames(cls.id, {}, [])}>
            id: 2324234
          </p>
          <button 
            className={classNames(cls.copy, {}, [])}
          >
            <img 
              className={classNames(cls.svg, {}, [])}
              alt='#'
              src={CopyIconSvg}
            />
          </button>
          <button className={classNames(cls.copy, {}, [])}></button>
        </div>
      </div>
      <p className={classNames(cls.referalcCount, {}, [])}>0</p>
    </li>
  )
}