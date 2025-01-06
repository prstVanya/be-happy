import { classNames } from '../../../../utils/classNames/className';
import cls from './PromoCodeSection.module.css';
import ButtonSelect from '@/components/ButtonSelect/ButtonSelect';

export const PromoCodeSection = () => {
  return (
    <section className={classNames(cls.promo, {}, [])}>
      <div className={classNames(cls.container, {}, [])}>
        <form className={classNames(cls.form, {}, [])}>
          <label className={classNames(cls.label, {}, [])}>
            <input
              className={classNames(cls.input, {}, [])}
              type='text'
              name='промокод'
              placeholder='Промокод...'
            />
          </label>
          <ButtonSelect
            isLight={false}
            title='Применить'
            isDisabled={false}
            isSold={false}   
          />
        </form>
      </div>
    </section>
  );
};
