type Mods = Record<string, boolean | string>;

// универсальная функция добавления классов к компоненту, аналого функции из react бибилиотеке classNames
// функция принимает строку с названием класса, объект где ключи это названия классов а значение это boolean или string
// и из этого объект будут выбраны те ключи (классы) значения которых true, и массив названий классов.
// на выходе все эти входные параметры будут преобразовавы в одну строку содержащию названия нужных нам классов
// вызов нашей функции classNames на react комопоненте может выглядет примерно так:
// className={classnNames('first', {second: false, third: true}, ['four', 'five'])} в итоге копонет получти классы 'first third four five'
export function classNames(cls: string, mods: Mods, additional: string[]): string {
    return [
        cls,
        ...additional,
        ...Object.entries(mods)
            .filter(([className, value]) => Boolean(value))
            .map(([className]) => className),
    ].join(' ');
}
