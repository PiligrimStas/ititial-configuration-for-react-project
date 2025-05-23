//Navber.tsx

import { classNames } from 'shared/lib/classNames/classNames';
import { links, mainLink, navbar } from './Navbar.module.scss';
import { AppLink, AppLinkTheme } from 'shared/ui/AppLink/AppLink';
import { ThemeSwitcher } from 'widgets/ThemeSwitcher';

interface NavbarProps {
    className?: string;
}

export const Navbar = ({ className }: NavbarProps) => {
    return (
        <div className={classNames(navbar, {}, [className || ''])}>
            <ThemeSwitcher />
            <div className={links}>
                <AppLink theme={AppLinkTheme.SECONDARY} to={'/'} className={mainLink}>
                    Главная
                </AppLink>
                <AppLink theme={AppLinkTheme.RED} to={'/about'}>
                    О сайте
                </AppLink>
            </div>
        </div>
    );
};
