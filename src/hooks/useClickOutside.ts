import {useEffect, RefObject} from 'react';

const useClickOutside = (refs: RefObject<HTMLElement>[], callback: () => void) => {
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (refs.every((ref) => ref.current && !ref.current.contains(event.target as Node))) {
                callback();
            }
        };

        // Attach the event listener
        document.addEventListener('mousedown', handleClickOutside);

        // Cleanup listener when component unmounts
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [refs, callback]);
}

export default useClickOutside;