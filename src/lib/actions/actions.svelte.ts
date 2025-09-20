export function clickOutside(node: HTMLElement, callback?: () => void) {

    const handleClick = (event: MouseEvent) => {
        if (!node.contains(event.target as Node)) {
            if (callback) {
                callback();
            } else {
                node.dispatchEvent(new CustomEvent('clickoutside'));
            }
        }
    };

    $effect(() => {
        document.addEventListener('click', handleClick, { capture: true });

        return () => {
            document.removeEventListener('click', handleClick, true);
        }
    });
    
}