// Navber.tsx

import { useTranslation } from 'react-i18next';

import { classNames } from 'shared/lib/classNames/classNames';
import { AppLink, AppLinkTheme } from 'shared/ui/AppLink/AppLink';

import type { JSX } from 'react';

import { links, mainLink, navbar } from './Navbar.module.scss';

interface NavbarProps {
    className?: string;
}

export const Navbar = ({ className }: NavbarProps): JSX.Element => {
    const { t } = useTranslation();
    return (
        <div className={classNames(navbar, {}, [className ?? ''])}>
            <div className={links}>
                <AppLink theme={AppLinkTheme.SECONDARY} to={'/'} className={mainLink}>
                    {t('Главная')}
                </AppLink>
                <AppLink theme={AppLinkTheme.RED} to={'/about'}>
                    {t('О сайте')}
                </AppLink>
            </div>
        </div>
    );
};
