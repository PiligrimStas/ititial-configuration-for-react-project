import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

i18n.use(initReactI18next).init({
    lng: 'ru',
    fallbackLng: 'ru',
    ns: ['common', 'main', 'about'], // желательно что бы этот списко повторял список из боевого конфига
    debug: false,

    interpolation: {
        escapeValue: false, // not needed for react!!
    },
    resources: { ru: { translations: {} } },
});

export default i18n;

// Это конфигруация i18n нужна исклчетельно в тестах, этот конфиг взят с официальной документации i18n react и немного доработан
// Этот конфиг как основной конфиг только сильно облегчённый
