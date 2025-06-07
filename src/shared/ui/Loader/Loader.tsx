import { classNames } from 'shared/lib/classNames/classNames';

import {ldsHourglass} from './Loader.module.scss';

interface LoaderProps {
    className?: string;
}

export const Loader = ({ className }: LoaderProps) => (
    <div className={classNames(ldsHourglass, {}, [className ?? ''])} />
);
