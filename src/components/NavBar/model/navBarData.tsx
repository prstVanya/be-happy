import ProfileIcon from '@/assets/images/icons/navbar/profile.svg';
import ProfileIconActive from '@/assets/images/icons/navbar/profileActive.svg';
import CityIcon from '@/assets/images/icons/navbar/city.svg';
import CityIconActive from '@/assets/images/icons/navbar/cityActive.svg';
import BuisnesIcon from '@/assets/images/icons/navbar/Buisnes.svg';
import BuisnesIconActive from '@/assets/images/icons/navbar/buisnesActive.svg';
import ShopIcon from '@/assets/images/icons/navbar/shop.svg';
import ShopIconActive from '@/assets/images/icons/navbar/shopActive.svg';
import BonusIcon from '@/assets/images/icons/navbar/Bonus.svg';
import BonusIconActive from '@/assets/images/icons/navbar/bonusActive.svg';
import { AppMainPageRoutePath } from '@/navigation/routes';

interface INavBarData {
  to: string;
  icon: string;
  activeIcon: string;
}

export const navBarData: INavBarData[] = [
  {
    to: AppMainPageRoutePath.profile,
    icon: ProfileIcon,
    activeIcon: ProfileIconActive,
  },
  {
    to: AppMainPageRoutePath.city,
    icon: CityIcon,
    activeIcon: CityIconActive,
  },
  {
    to: '#',
    icon: BuisnesIcon,
    activeIcon: BuisnesIconActive,
  },
  {
    to: '#',
    icon: ShopIcon,
    activeIcon: ShopIconActive,
  },
  {
    to: AppMainPageRoutePath.bonus,
    icon: BonusIcon,
    activeIcon: BonusIconActive,
  },
];
