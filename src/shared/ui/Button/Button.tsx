import { classNames } from 'shared/lib/classNames/classNames';

import type { ButtonHTMLAttributes, FC } from 'react';

import { button, clear, outline } from './Button.module.scss';

export enum ThemeButton {
    CLEAR = 'clear',
    OUTLINE = 'outline',
}

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    className?: string;
    theme?: ThemeButton;
}

const buttonThemeClasses: Record<ThemeButton, string> = {
    [ThemeButton.CLEAR]: clear,
    [ThemeButton.OUTLINE]: outline,
};

export const Button: FC<ButtonProps> = (props) => {
    const { className, children, theme = ThemeButton.CLEAR, ...otherProps } = props;

    return (
        <button
            className={classNames(button, { [buttonThemeClasses[theme]]: true }, [className ?? ''])}
            {...otherProps}
        >
            {children}
        </button>
    );
};
