<script>
    import { createEventDispatcher } from "svelte";
    import Tile from "./Tile.svelte";

    const dispatch = createEventDispatcher();
    export let backgroundImage;
    export let answer = "";
    export let reveal = false;
    export let reset = false;

    const GRID_SIZE = { cols: 6, rows: 4 };
    const TOTAL_TILES = GRID_SIZE.cols * GRID_SIZE.rows;
    const alphabet = Array.from({ length: TOTAL_TILES }, (_, i) =>
        String.fromCharCode(65 + i),
    );

    let opacities = Array(TOTAL_TILES).fill(1);
    $: allTilesInvisible = opacities.every((o) => o === 0);
    $: if (allTilesInvisible) dispatch("completed");
    $: if (reveal) opacities = Array(TOTAL_TILES).fill(0);
    $: if (reset) opacities = Array(TOTAL_TILES).fill(1);

    function fadeTile(index) {
        if (opacities[index] === 1) {
            opacities[index] = 0;
            opacities = [...opacities];
        }
    }

    function handleKeydown(e) {
        if (e.key !== " " || allTilesInvisible) return;
        const visibleIndices = opacities
            .map((o, i) => (o === 1 ? i : null))
            .filter((i) => i !== null);
        if (visibleIndices.length) {
            fadeTile(
                visibleIndices[
                    Math.floor(Math.random() * visibleIndices.length)
                ],
            );
        }
    }
</script>

<svelte:window on:keydown={handleKeydown} />

<!-- Root div now handles the background -->
<div
    class="w-full h-full overflow-hidden game-background"
    style="background-image: url('{backgroundImage ||
        'https://via.placeholder.com/800x600'}');"
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

    {#if allTilesInvisible && answer}
        <div
            class="absolute bottom-4 left-4 z-10 bg-base-300 bg-opacity-80 p-4 rounded-lg"
        >
            <h3 class="text-xl font-bold">Answer:</h3>
            <p class="text-lg">{answer}</p>
        </div>
    {/if}
</div>

<style>
    .game-background {
        background-size: cover;
        background-position: center;
        background-repeat: no-repeat;
        position: relative; /* Ensure tiles can position absolutely inside */
    }

    .tile-grid {
        grid-template-columns: repeat(6, 1fr);
        grid-template-rows: repeat(4, 1fr);
    }

    @media (min-aspect-ratio: 2/1) {
        .tile-grid {
            grid-template: repeat(3, 1fr) / repeat(8, 1fr);
        }
    }
    @media (max-aspect-ratio: 1/1) {
        .tile-grid {
            grid-template: repeat(6, 1fr) / repeat(4, 1fr);
        }
    }
    @media (max-aspect-ratio: 1/2) {
        .tile-grid {
            grid-template: repeat(8, 1fr) / repeat(3, 1fr);
        }
    }
</style>
