// Sidebar.tsx

import { type JSX, useState } from 'react';

import { classNames } from 'shared/lib/classNames/classNames';
import { Button, ThemeButton } from 'shared/ui/Button/Button';
import { LangSwitcher } from 'widgets/LangSwitcher/LangSwitcher';

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
            data-testid="sidebar"
            className={classNames(sidebar, { [sidebarClasses.collapsed]: isCollapsed }, [
                className ?? '',
            ])}
        >
            <Button theme={ThemeButton.OUTLINE} onClick={onToggle} data-testid="sidebar-toggle">
                123
            </Button>
            <LangSwitcher />
        </div>
    );
};
