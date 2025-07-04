// global.dts
declare module '*.scss' {
    type IClassNames = Record<string, string>;
    const classNames: IClassNames;
    export = classNames;
}

declare module '*.png';
declare module '*.jpg';
declare module '*.jpeg';

declare module '*.svg' {
    const content: string;
    export default content;
}

// Декларация для импорта SVG как React-компонента
declare module '*.svg?react' {
    import type * as React from 'react';

    const ReactComponent: React.FunctionComponent<React.SVGProps<SVGSVGElement>>;
    export default ReactComponent;
}

declare const __IS_DEV__: boolean; // типизируем глобальую перменную которую мы создали в ebpack.DefinePlugin

declare module 'i18next-localstorage-cache' {
    import type { Module } from 'i18next';

    const cache: Module;
    export default cache;
}

declare module 'jest-image-snapshot';
