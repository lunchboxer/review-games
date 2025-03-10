<script>
    import { createEventDispatcher } from "svelte";
    import Tile from "./Tile.svelte";

    const dispatch = createEventDispatcher();

    // Constants for grid layout
    const GRID_COLS = 6;
    const GRID_ROWS = 4;
    const TOTAL_TILES = GRID_COLS * GRID_ROWS;

    // Props
    export let backgroundImage;
    export let answer = "";
    export let reveal = false;
    export let reset;

    // Generate alphabet tiles (A-Z)
    const alphabet = Array.from({ length: TOTAL_TILES }, (_, i) =>
        String.fromCharCode(65 + i),
    );

    // Reactive state
    let opacities = Array(TOTAL_TILES).fill(1);
    let showAnswer = false;

    // Computed values
    $: allTilesInvisible = opacities.every((opacity) => opacity === 0);
    $: if (allTilesInvisible) {
        showAnswer = true;
        dispatch("completed");
    }

    $: if (reveal) {
        opacities = opacities.map(() => 0);
    }

    $: if (reset) {
        opacities = Array(TOTAL_TILES).fill(1);
        showAnswer = false;
    }

    /**
     * Fade a specific tile at the given index
     * @param {number} index - The tile index to fade
     */
    function fadeTile(index) {
        opacities[index] = 0;
        opacities = [...opacities]; // Trigger reactivity
    }

    /**

     * Handle keyboard events for the game
     * @param {KeyboardEvent} e - Keyboard event
     */
    function onkeydown(e) {
        if (e.key === " ") {
            if (allTilesInvisible) {
                return;
            }
            // Randomly select a visible tile to fade
            const visibleIndices = opacities
                .map((opacity, index) => (opacity === 1 ? index : null))
                .filter((index) => index !== null);

            if (visibleIndices.length > 0) {
                const randomIndex = Math.floor(
                    Math.random() * visibleIndices.length,
                );
                fadeTile(visibleIndices[randomIndex]);
            }
        }
    }
</script>

<svelte:window {onkeydown} />

<div
    class="relative w-full h-full overflow-hidden"
    style="background-image: url('{backgroundImage}'); background-size: cover; background-position: center;"
>
    <div class="tile-grid absolute inset-0 grid">
        {#each alphabet as letter, index}
            <Tile
                {letter}
                opacity={opacities[index]}
                on:click={() => fadeTile(index)}
            />
        {/each}
    </div>

    {#if showAnswer && answer}
        <div
            class="absolute bottom-4 left-4 z-10 bg-base-300 bg-opacity-80 p-4 rounded-lg"
        >
            <h3 class="text-xl font-bold">Answer:</h3>
            <p class="text-lg">{answer}</p>
        </div>
    {/if}
</div>

<style>
    @media (min-aspect-ratio: 2/1) {
        .tile-grid {
            grid-template-columns: repeat(8, 1fr);
            grid-template-rows: repeat(3, 1fr);
        }
    }
    @media (max-aspect-ratio: 2/1) {
        .tile-grid {
            grid-template-columns: repeat(6, 1fr);
            grid-template-rows: repeat(4, 1fr);
        }
    }

    @media (max-aspect-ratio: 1/1) {
        .tile-grid {
            grid-template-columns: repeat(4, 1fr);
            grid-template-rows: repeat(6, 1fr);
        }
    }

    @media (max-aspect-ratio: 1/2) {
        .tile-grid {
            grid-template-columns: repeat(3, 1fr);
            grid-template-rows: repeat(8, 1fr);
        }
    }
</style>
