import { classNames } from '@/utils/classNames/className';
import cls from './ReferalPage.module.css';
import { UserInfo } from '../Profile/UserInfo';
import { Title } from './Title';
import { NewsBlock } from './NewsBlock';
import { useDispatch, useSelector } from 'react-redux';
import { ReferalLink } from './ReferalLink';
import { setUserReferralAction } from '@/store/Slice/userSlice';
import { useEffect } from 'react';

export const ReferalPage = () => {
  const user = useSelector((state: any) => state.user.info);
  const referrals = useSelector((state: any) => state.user.referrals);
  const dispatch = useDispatch();
  const botUsername = 'FatherHappyTestBot';

  const url = `https://t.me/${botUsername}?start=${user.id}`;

  useEffect(() => {
    const referrerId = new URLSearchParams(window.location.search).get('start');
    console.log(window.location.search);
    console.log(referrerId);
  
    if (referrerId) {
      const cleanId = referrerId.slice(7);
      console.log('Referrer ID:', cleanId);
  
      if (cleanId && cleanId !== user.id) {
        dispatch(setUserReferralAction(cleanId));
      }
    }
  }, [user.id, dispatch]);

  return (
    <main className={classNames(cls.main, {}, [])}>
      <div className={classNames(cls.content, {}, [])}>
        <UserInfo visibleTitle={false} />
        <Title />
        <NewsBlock />
        <ReferalLink 
          link={url} 
          refCount={referrals.length}
        />
      </div>
    </main>
  )
}