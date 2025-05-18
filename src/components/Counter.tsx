//Counter.tsx
import { useState } from 'react';
import * as classes from './Counter.module.scss';
// import { color, div, blablaclass, btn, asd } from './Counter.module.scss';

const Counter = () => {
    const [count, setCount] = useState(0);

    const increment = () => {
        setCount(count + 1);
    };

    return (
        <div className={classes.asd}>
            <h1 className={classes.btn}>{count}</h1>
            <button className={classes.green} onClick={increment}>
                increment
            </button>
        </div>
    );
};

export default Counter;
