// AppLink.visual.test.ts
// Кастомный визуальный тест для AppLink primary story.
// Этот тест демонстрирует, как можно писать отдельные visual тесты для конкретных stories,
// если нужно добавить специфическую логику или особые настройки.

// Подключаем jest-image-snapshot для проверки скриншотов
import { toMatchImageSnapshot } from 'jest-image-snapshot';
// Подключаем puppeteer для управления браузером
import puppeteer, { Browser, Page } from 'puppeteer';

// Регистрируем toMatchImageSnapshot как matcher Jest
expect.extend({ toMatchImageSnapshot });

describe('AppLink visual test', () => {
    let browser: Browser;
    let page: Page;

    beforeAll(async () => {
        // Запускаем новый браузер перед тестом
        browser = await puppeteer.launch();
        page = await browser.newPage();
    });

    afterAll(async () => {
        // Закрываем браузер после завершения теста
        await browser.close();
    });

    it('should match snapshot for AppLink primary story', async () => {
        // URL конкретной story для тестирования
        const url = 'http://localhost:6006/iframe.html?id=shared-applink--primary';

        // Загружаем страницу с ожиданием готовности DOM
        await page.goto(url, { waitUntil: 'domcontentloaded', timeout: 60000 });

        // Отключаем анимации и transition, чтобы исключить нестабильность скринов
        await page.addStyleTag({
            content: `
        *,
        *::before,
        *::after {
          transition: none !important;
          animation: none !important;
        }
      `,
        });

        // Ждём немного для полной стабилизации рендера
        await new Promise((resolve) => setTimeout(resolve, 500));

        // Делаем скриншот всей страницы (iframe с компонентом)
        const screenshot = await page.screenshot();

        // Сравниваем скриншот с эталоном (image snapshot)
        // Используем customSnapshotIdentifier для понятного имени файла снимка
        expect(screenshot).toMatchImageSnapshot({
            customSnapshotIdentifier: 'shared-applink--primary-custom',
        });
    });
});
