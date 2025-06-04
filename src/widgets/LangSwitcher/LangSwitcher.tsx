import { useTranslation } from 'react-i18next';

import { classNames } from 'shared/lib/classNames/classNames';
import { Button, ThemeButton } from 'shared/ui/Button/Button';

import type { JSX } from 'react';

interface LangSwitcherProps {
    className?: string;
}

export const LangSwitcher = ({ className }: LangSwitcherProps): JSX.Element => {
    const { t, i18n } = useTranslation();

    const toggle = async (): Promise<void> => {
        await i18n.changeLanguage(i18n.language === 'ru' ? 'en' : 'ru');
    };

    return (
        <Button
            className={classNames('', {}, [className ?? ''])}
            theme={ThemeButton.CLEAR}
            onClick={() => void toggle()}
        >
            {t('Язык')}
        </Button>
    );
};
