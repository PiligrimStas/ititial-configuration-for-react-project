import { Link, type LinkProps } from 'react-router-dom';

import { classNames } from 'shared/lib/classNames/classNames';

import type { FC } from 'react';

import { appLink, primary, red, secondary } from './AppLink.module.scss';

export enum AppLinkTheme {
    PRIMARY = 'primary',
    SECONDARY = 'secondary',
    RED = 'red',
}

interface AppLinkProps extends LinkProps {
    className?: string;
    theme?: AppLinkTheme;
}

const appLinkThemeClasses: Record<AppLinkTheme, string> = {
    [AppLinkTheme.PRIMARY]: primary,
    [AppLinkTheme.SECONDARY]: secondary,
    [AppLinkTheme.RED]: red,
};

export const AppLink: FC<AppLinkProps> = (props) => {
    const { to, className, children, theme = AppLinkTheme.PRIMARY, ...otherProps } = props;

    return (
        <Link
            to={to}
            className={classNames(appLink, { [appLinkThemeClasses[theme]]: true }, [
                className ?? '',
            ])}
            {...otherProps}
        >
            {children}
        </Link>
    );
};
