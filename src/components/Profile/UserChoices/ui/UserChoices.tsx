import { classNames } from '../../../../utils/classNames/className';
import ButtonSelect from '../../../ButtonSelect/ButtonSelect';
import cls from './UserChoices.module.css';

export const UserChoices = () => {
  return (
    <div className={classNames(cls.choices, {}, [])}>
      <ButtonSelect isDisabled={false} isSold={false} isLight={false} title='Профиль' />
      <ButtonSelect isDisabled={false} isSold={false} isLight={false} title='Операции' />
      <ButtonSelect isDisabled={false} isSold={false} isLight={false} title='История' />
    </div>
  );
};
