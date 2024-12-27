import { classNames } from '../../../../utils/classNames/className';
import ButtonSelect from '../../../ButtonSelect/ButtonSelect';
import cls from './UserChoices.module.css';

export const UserChoices = () => {
  return (
    <div className={classNames(cls.choices, {}, [])}>
      <ButtonSelect isLight={false} title='Профиль' />
      <ButtonSelect isLight={false} title='Операции' />
      <ButtonSelect isLight={false} title='История' />
    </div>
  );
};
