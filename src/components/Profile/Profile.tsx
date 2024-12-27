import { classNames } from '@/utils/classNames/className';
import { UserInfo } from './UserInfo';
import { UserChoices } from './UserChoices';
import { Slider } from './Slider';
import { PromoCodeSection } from './PromoCodeSection';
import { StageSection } from './StagesSection';
import cls from './Profile.module.css';

export const Profile = () => {
  return (
    <main className={classNames(cls.main, {}, [])}>
      <div className={classNames(cls.content, {}, [])}>
        <UserInfo visibleTitle={false} />
        <UserChoices />
        <Slider />
        <PromoCodeSection />
        <StageSection />
      </div>
    </main>
  );
};
