import { writable, derived } from 'svelte/store';
import { shuffle } from '$lib/utils';

export function createGameStore(imageSet) {
    const images = writable(imageSet);
    const currentIndex = writable(0);
    const revealAll = writable(false);
    const resetTrigger = writable(false); // This might be the issue

    const currentImage = derived([images, currentIndex], ([$images, $currentIndex]) => {
        return $images[$currentIndex];
    });

    const isGameCompleted = writable(false);

    function nextImage() {
        currentIndex.update((idx) => {
            if (idx < imageSet.length - 1) {
                // Reset tiles before moving to next image
                resetTrigger.set(true); // Trigger reset
                revealAll.set(false);   // Reset reveal state
                setTimeout(() => resetTrigger.set(false), 0); // Reset the trigger after a tick
                return idx + 1;
            } else {
                isGameCompleted.set(true);
                return idx;
            }
        });
    }

    function reveal() {
        revealAll.set(true);
    }

    function restart() {
        images.set(shuffle(imageSet));
        currentIndex.set(0);
        revealAll.set(false);
        resetTrigger.set(true);
        isGameCompleted.set(false);
        setTimeout(() => resetTrigger.set(false), 0);
    }

    return {
        images,
        currentImage,
        isGameCompleted,
        revealAll,
        resetTrigger,
        currentIndex,
        nextImage,
        reveal,
        restart,
    };
}
