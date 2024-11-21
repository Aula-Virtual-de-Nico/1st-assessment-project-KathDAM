import { useState } from 'react';
export default function Counter() {
    const [counter, setCounter] = useState(0);
    function handleIncrement() {
        setCounter(counter + 1);
    }
    function handleDecrement() {
        setCounter(counter - 1);
    }
    return (
        <div className="row gap-3">
            <button className="btn btn-success col" onClick={handleIncrement}>
                +1
            </button>
            <button className="btn btn-danger col" onClick={handleDecrement}>
                -1
            </button>
            <h2 className="text-center">Counter: {counter}</h2>
        </div>
    );
}