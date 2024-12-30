import { classNames } from '@/utils/classNames/className';
import './Loader.css';

interface ILoadingProps {
  className?: string;
}

export const Loader = ({ className }: ILoadingProps) => {
  return (
    <div className={classNames('lds-dual-ring', {}, [className || ''])}></div>
  );
};