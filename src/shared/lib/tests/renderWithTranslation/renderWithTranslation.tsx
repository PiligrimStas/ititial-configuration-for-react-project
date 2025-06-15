import { render } from '@testing-library/react';
import { ReactNode } from 'react';
import { I18nextProvider } from 'react-i18next';

import i18nForTests from 'shared/config/i18n/i18nForTests';

export function renderWithTranslation(component: ReactNode) {
    return render(<I18nextProvider i18n={i18nForTests}>{component}</I18nextProvider>);
}

// Эта функция нужно что бы корректно можно было протестировать reactComponent использующие i18n перевод
// вызывается исколючительно в тестовых файлах, прнимает reactComponent и воборачивает его в i18n провайдер
// и бередаёт эту обёртку  всесте с компонентов в метод render RTL и возваращает результат вызова этого метода
// по сути это доработанный вариант предложенный официальной документацией. Что бы не оборачивать в каждом тестовом
// файле компонент в провайдер, мы передаём его этой функции которая сделает это за нас
