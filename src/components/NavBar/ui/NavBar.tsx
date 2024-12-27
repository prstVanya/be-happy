import { classNames } from '@/utils/classNames/className';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import cls from './NavBar.module.css';
import { navBarData } from '../model/navBarData';

interface INavBar {
  className?: string;
}

export const NavBar = ({ className }: INavBar) => {
  const [activeIcon, setActiveIcon] = useState(0);

  const handleClickToIcon = (i: number) => {
    setActiveIcon(i);
  };

  return (
    <nav className={classNames(cls.navbar, {}, [className || ''])}>
        <div className={classNames(cls.container, {}, [])}>
          <ul className={classNames(cls.list, {}, [])}>
            {navBarData.map((w, i) => {
              return (
                <li
                className={classNames(cls.item, {}, [])}
                key={i}
              >
                <Link
                  className={classNames(cls.link, {}, [])}
                  onClick={() => handleClickToIcon(i)}
                  to={w.to}
                >
                  <img
                    src={activeIcon === i ? w.activeIcon : w.icon}
                    alt="icon"
                    className={classNames(cls.icon, {}, [])}
                  />
                </Link>
              </li>
              );
            })}
          </ul>
        </div>
    </nav>
  );
};
