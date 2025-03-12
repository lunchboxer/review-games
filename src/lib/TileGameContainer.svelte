<script>
    import { createGameStore } from "$lib/stores/revealGameStore.js";
    import TileGame from "./TileGame.svelte";

    export let imageSet;
    const game = createGameStore(imageSet);
    const {
        currentImage,
        isGameCompleted,
        revealAll,
        resetTrigger,
        images,
        currentIndex,
    } = game;
</script>

<main class="min-h-screen w-full flex flex-col">
    {#if !$isGameCompleted}
        <!-- Parent container with explicit height and width -->
        <div class="flex-grow w-full h-full game-container">
            <TileGame
                backgroundImage={$currentImage.imageUrl}
                answer={$currentImage.answer}
                reveal={$revealAll}
                reset={$resetTrigger}
                on:completed={game.reveal}
            />
        </div>
        <footer class="p-4 bg-base-300 flex justify-between items-center">
            <div class="text-lg">
                Image {$currentIndex + 1} of {$images.length}
            </div>
            <div class="space-x-2">
                <a class="btn" href="/">Leave Game</a>
                {#if !$revealAll}
                    <button class="btn btn-secondary" on:click={game.reveal}>
                        Reveal
                    </button>
                {/if}
                <button class="btn btn-primary" on:click={game.nextImage}>
                    {$currentIndex < imageSet.length - 1
                        ? "Next Image"
                        : "Finish Game"}
                </button>
            </div>
        </footer>
    {:else}
        <div
            class="flex flex-col items-center justify-center h-screen bg-base-200 p-8"
        >
            <h1 class="text-3xl font-bold mb-6">Game Completed!</h1>
            <p class="text-xl mb-8">
                You’ve viewed all {$images.length} images.
            </p>
            <div class="space-x-2">
                <a class="btn btn-secondary" href="/">Back to Menu</a>
                <button class="btn btn-primary" on:click={game.restart}>
                    Play Again
                </button>
            </div>
        </div>
    {/if}
</main>

<style>
    main {
        height: 100vh; /* Ensure full viewport height */
    }
    .game-container {
        position: relative; /* Allow absolute positioning inside TileGame */
        overflow: hidden; /* Hide overflow from background image */
    }
</style>
