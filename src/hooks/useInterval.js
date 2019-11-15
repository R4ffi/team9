import { useEffect } from 'react';

export const useInterval = (callback, delay) => {
    // Set up the interval.
    useEffect(() => {
        let id;
        const tick = async() => {
            try {
                const result = callback();
                if (result instanceof Promise)
                    await result;
            } finally {
                setTimeout(tick, delay);
            }
        };

        if (delay !== null) {
            tick();
            return () => clearTimeout(id);
        }
    }, [callback, delay]);
}