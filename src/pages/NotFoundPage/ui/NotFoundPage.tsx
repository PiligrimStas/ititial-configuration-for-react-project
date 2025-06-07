//NotFoundPage.tsx
import { useTranslation } from 'react-i18next';

import { classNames } from 'shared/lib/classNames/classNames';

import { notFoundPage } from './NotFoundPage.module.scss';

interface NotFoundPageProps {
    className?: string;
}

export const NotFoundPage = ({ className }: NotFoundPageProps) => {
    const { t } = useTranslation();
    return (
        <div className={classNames(notFoundPage, {}, [className ?? ''])}>
            {t('Страница не найдена')}
        </div>
    );
};
