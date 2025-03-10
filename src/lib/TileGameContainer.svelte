<script>
    import { shuffle } from "./utils.js";
    import TileGame from "./TileGame.svelte";

    // This will be passed in from the parent component
    export let imageSet = [{ imageUrl: "/images/test-bg.avif", answer: "bus" }];

    // State variables
    let shuffledImages = [];
    let currentIndex = 0;
    let gameCompleted = false;
    let reveal = false;
    let resetTileGame = false;
    let currentImageUrl = null;

    $: {
        // This will re-run if imageSet changes
        shuffledImages = shuffle([...imageSet]);
        currentIndex = 0;
        gameCompleted = false;
        reveal = false;
    }

    // Get current image data
    $: currentImage = shuffledImages[currentIndex];
    $: currentImageUrl = currentImage ? currentImage.imageUrl : null;

    function resetGame() {
        reveal = false;
        resetTileGame = !resetTileGame;
    }

    // Handle "Next" button click
    function handleNext() {
        if (currentIndex < shuffledImages.length - 1) {
            currentIndex++;
            resetGame();
        } else {
            gameCompleted = true;
        }
    }

    // Restart game
    function restartGame() {
        shuffledImages = shuffle([...imageSet]);
        currentIndex = 0;
        gameCompleted = false;
    }
</script>

{#if shuffledImages.length > 0}
    {#if !gameCompleted}
        <div class="flex flex-col h-screen">
            <div class="flex-grow">
                <TileGame
                    backgroundImage={currentImage.imageUrl}
                    answer={currentImage.answer}
                    {reveal}
                    reset={resetTileGame}
                    on:completed={() => {
                        reveal = true;
                    }}
                />
            </div>

            <div class="p-4 bg-base-300 flex justify-between items-center">
                <div class="text-lg">
                    Image {currentIndex + 1} of {shuffledImages.length}
                </div>
                <div>
                    <a class="btn" href="/">Leave Game</a>
                    {#if !reveal && currentImage}
                        <button
                            class:hidden={gameCompleted}
                            class="btn btn-secondary ml-2"
                            on:click={() => {
                                reveal = true;
                            }}
                        >
                            Reveal
                        </button>
                    {/if}
                    <button class="btn btn-primary" on:click={handleNext}>
                        {currentIndex < shuffledImages.length - 1
                            ? "Next Image"
                            : "Finish Game"}
                    </button>
                </div>
            </div>
        </div>
    {:else}
        <div
            class="flex flex-col items-center justify-center h-screen bg-base-200 p-8"
        >
            <h1 class="text-3xl font-bold mb-6">Game Completed!</h1>
            <p class="text-xl mb-8">
                You've viewed all {shuffledImages.length} images.
            </p>
            <div class="flex gap-2 justify-center">
                <a class="btn btn-secondary" href="/">Back to Menu</a>
                <button class="btn btn-primary" on:click={restartGame}>
                    Play Again
                </button>
            </div>
        </div>
    {/if}
{:else}
    <div class="flex items-center justify-center h-screen">
        <p>No images available.</p>
    </div>
{/if}
