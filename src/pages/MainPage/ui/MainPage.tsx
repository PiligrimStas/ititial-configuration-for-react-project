import { useTranslation } from 'react-i18next';
import { btn, btn2, btn3, btn4, btn5 } from './MainPage.module.scss';

const MainPage = () => {
    const { t } = useTranslation();
    return (
        <div>
            {t('Главная страница')}
            <button className={btn}>asdfasdf</button>
            <button className={btn2}>asdfasdf</button>
            <button className={btn3}>asdfasdf</button>
            <button className={btn4}>asdfasdf</button>
            <button className={btn5}>asdfasdf</button>
        </div>
    );
};

export default MainPage;
