import { classNames } from 'shared/lib/classNames/classNames';

import type { ButtonHTMLAttributes, FC } from 'react';

import { button, clear } from './Button.module.scss';

export enum ThemeButton {
    CLEAR = 'clear',
}

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    className?: string;
    theme?: ThemeButton;
}

const buttonThemeClasses: Record<ThemeButton, string> = {
    [ThemeButton.CLEAR]: clear,
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
