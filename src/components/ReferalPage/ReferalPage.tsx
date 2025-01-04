import { classNames } from '@/utils/classNames/className';
import cls from './ReferalPage.module.css';
import { UserInfo } from '../Profile/UserInfo';
import { Title } from './Title';
import { NewsBlock } from './NewsBlock';
import { useSelector } from 'react-redux';
import { ReferalLink } from './ReferalLink';

export const ReferalPage = () => {
  const user = useSelector((state: any) => state.user.info);
  const botUsername = 'FatherHappyTestBot';

  const url = `https://t.me/${botUsername}?start=${user.id}`;

  return (
    <main className={classNames(cls.main, {}, [])}>
      <div className={classNames(cls.content, {}, [])}>
        <UserInfo visibleTitle={false} />
        <Title />
        <NewsBlock />
        <ReferalLink link={url} />
      </div>
    </main>
  )
}