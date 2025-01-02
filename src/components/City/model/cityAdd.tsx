import CoffeSvg from '@/assets/images/icons/business/coffe.svg';
import ShopSvg from '@/assets/images/icons/business/shopLight.svg';
import ClubSvg from '@/assets/images/icons/business/club.svg';
import ResorauntSvg from '@/assets/images/icons/business/restoranLight.svg';
import HotelSvg from '@/assets/images/icons/business/hotel.svg';
import CasinoSvg from '@/assets/images/icons/business/casino.svg';
import { ICityAdd } from '@/types';

export const imagesForCities = [
  CoffeSvg, ShopSvg, ClubSvg, ResorauntSvg, HotelSvg, CasinoSvg
];

export const cityAdd: ICityAdd[] = [
  {
    id: 1,
    image: CoffeSvg,
    name: 'Кофейня',
    income: 500,
    cost: 3000,
  },
  {
    id: 2,
    image: ShopSvg,
    name: 'Магазин',
    income: 2500,
    cost: 12000,
  },
  {
    id: 3,
    image: ClubSvg,
    name: 'Клуб',
    income: 2500,
    cost: 25000,
  },
  {
    id: 4,
    image: ResorauntSvg,
    name: 'Ресторан',
    income: 5000,
    cost: 100000,
  },
  {
    id: 5,
    image: HotelSvg,
    name: 'Отель',
    income: 8000,
    cost: 250000,
  },
  {
    id: 6,
    image: CasinoSvg,
    name: 'Казино',
    income: 20000,
    cost: 600000,
  },
]