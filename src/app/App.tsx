// App.tsx
// import { JSX Suspense } from 'react';
import { type JSX, Suspense } from 'react';
import { Outlet } from 'react-router-dom';

import { useTheme } from 'app/providers/ThemeProvider';
import { classNames } from 'shared/lib/classNames/classNames';
import { LangSwitcher } from 'widgets/LangSwitcher/LangSwitcher';
import { Navbar } from 'widgets/Navbar';
import { PageLoader } from 'widgets/PageLoader/ui/PageLoader';
import { Sidebar } from 'widgets/Sidebar';
import { ThemeSwitcher } from 'widgets/ThemeSwitcher';

import './styles/index.scss';

// если не все Route в Outlet lazyLoading то лучше оборачивать в suspense по отдельности отдельные маршруты в AppRouter
const App = (): JSX.Element => {
    const { theme } = useTheme();

    return (
        <div className={classNames('app app-display', {}, [theme])}>
            {/* <button onClick={toggleTheme}>TOGGLE</button> */}
            <Suspense fallback="">
                {/* этот Suspense нужен для нормальный работы i18next который будет гризит переводы аснихронно */}
                <Navbar />
                <div className="content-page">
                    <div className="left-side-wrapper">
                        <Sidebar />
                        <div className="switchers">
                            <ThemeSwitcher />
                        </div>
                        <div className="switchers">
                            <LangSwitcher />
                        </div>
                    </div>
                    <div className="page-wrapper">
                        <Suspense fallback={<PageLoader />}>
                            <Outlet />
                        </Suspense>
                    </div>
                </div>
            </Suspense>
        </div>
    );
};

export default App;
