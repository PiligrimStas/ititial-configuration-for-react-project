// Sidebar.tsx

import { type JSX, useState } from 'react';

import { classNames } from 'shared/lib/classNames/classNames';

import { sidebar, collapsed } from './Sidebar.module.scss';

interface SidebarProps {
    className?: string;
}

const sidebarClasses: Record<string, string> = {
    collapsed,
};

export const Sidebar = ({ className }: SidebarProps): JSX.Element => {
    const [isCollapsed, setIsCollapsed] = useState(false);

    const onToggle = (): void => {
        setIsCollapsed((prev) => !prev);
    };

    return (
        <div
            className={classNames(sidebar, { [sidebarClasses.collapsed]: isCollapsed }, [
                className ?? '',
            ])}
        >
            <button style={{ color: 'red' }} onClick={onToggle}>
                toggle
            </button>
        </div>
    );
};
