//Sidebar.tsx

import { classNames } from 'shared/lib/classNames/classNames';
import { sidebar, collapsed } from './Sidebar.module.scss';
import { useState } from 'react';

interface SidebarProps {
    className?: string;
}

const sidebarClasses: Record<string, string> = {
    collapsed: collapsed,
};

export const Sidebar = ({ className }: SidebarProps) => {
    const [isCollapsed, setIsCollapsed] = useState(false);

    const onToggle = () => {
        setIsCollapsed((prev) => !prev);
    };

    return (
        <div
            className={classNames(sidebar, { [sidebarClasses['collapsed']]: isCollapsed }, [
                className ?? '',
            ])}
        >
            <button style={{ color: 'red' }} onClick={onToggle}>
                toggle
            </button>
        </div>
    );
};
