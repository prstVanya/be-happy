import { classNames } from '../../../../utils/classNames/className';
import AvatarImage from '@/assets/images/avatar.jpeg';
import cls from './UserInfo.module.css';

interface IUserInfoData {
  title?: string;
  visibleTitle: boolean;
  username?: string;
  avatar?: string | null;
  id?: string;
}

export const UserInfo = ({
   title, visibleTitle, username, avatar, id, 
  }: IUserInfoData) => {
  return (
    <div className={classNames(cls.info, {}, [])}>
      <div className={classNames(cls.mainInfo)}>
        <img
          className={classNames(cls.avatar, {}, [])}
          alt='avatar'
          src={avatar || AvatarImage}
        />
        <div className={classNames(cls.block, {}, [])}>
          <h1 className={classNames(cls.name, {}, [])}>
            {username}
          </h1>
          <div className={classNames(cls.code, {}, [])}>
            <p className={classNames(cls.id, {}, [])}>
              {`id: ${id}`}
            </p>
            <button className={classNames(cls.copy, {}, [])}></button>
          </div>
        </div>
      </div>
      {visibleTitle && <h2 className={classNames(cls.pageTitle, {}, [])}>{title}</h2>}
    </div>
  );
};
