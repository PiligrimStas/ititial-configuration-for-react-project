// App.tsx
import { Outlet } from 'react-router-dom';
import './styles/index.scss';
import { classNames } from 'shared/lib/classNames/classNames';
import { useTheme } from 'app/providers/ThemeProvider';
import { Suspense } from 'react';
import { Navbar } from 'widgets/Navbar';
// если не все Route в Outlet lazyLoading то лучше оборачивать в suspense по отдельности отдельные маршруты в AppRouter

const App = () => {
    const { theme } = useTheme();

    return (
        <div className={classNames('app', {}, [theme])}>
            {/* <button onClick={toggleTheme}>TOGGLE</button> */}
            <Navbar />
            <Suspense fallback={<div>Загрузка страницы...</div>}>
                <Outlet />
            </Suspense>
        </div>
    );
};

export default App;
