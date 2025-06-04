import { useTranslation } from 'react-i18next';

import type { JSX } from 'react';

const AboutPage = (): JSX.Element => {
    const { t } = useTranslation('about');
    return <div>{t('О сайте')}</div>;
};

export default AboutPage;
