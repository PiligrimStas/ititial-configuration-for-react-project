// MainPage.tsx
import { useTranslation } from 'react-i18next';

import { BugButton } from 'app/providers/ErrorBoundary';

import type { JSX } from 'react';

import { btn, btn2, btn3, btn4, btn5 } from './MainPage.module.scss';

const MainPage = (): JSX.Element => {
    const { t } = useTranslation();
    return (
        <div>
            {t('Главная страница')}
            <button className={btn}>1234</button>
            <button className={btn2}>1234</button>
            <button className={btn3}>1234</button>
            <button className={btn4}>1234</button>
            <button className={btn5}>1234</button>
            <BugButton />
        </div>
    );
};

export default MainPage;
