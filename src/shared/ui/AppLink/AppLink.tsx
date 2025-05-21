import { classNames } from 'shared/lib/classNames/classNames';
import { appLink, primary, red, secondary } from './AppLink.module.scss';
import { Link, LinkProps } from 'react-router-dom';
import { FC } from 'react';

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
                className || '',
            ])}
            {...otherProps}
        >
            {children}
        </Link>
    );
};
