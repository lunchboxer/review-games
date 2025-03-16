<script>
    import { shuffle } from "$lib/utils.js";
    import { fade } from "svelte/transition";

    export let words = [
        "carrots",
        "banana",
        "apple",
        "steak",
        "chicken",
        "peas",
        "cake",
    ];
    let colors = ["red", "green", "blue", "yellow", "orange", "purple", "pink"];

    let selectedWords = [];
    let audio;
    let currentColor;
    let gameStarted = false;
    let message = "";
    let showMessage = false;
    let currentColorIndex = 0;
    let score = 0;
    let gameOver = false;

    // Shuffle colors and words on initialization
    colors = shuffle(colors);
    words = shuffle(words);

    function playAgain() {
        gameStarted = true;
        gameOver = false;
        score = 0;
        currentColorIndex = 0;
        colors = shuffle(colors);
        words = shuffle(words);
        startGame();
        playAudio(currentColor);
        showMessage = false;
    }

    function startGame() {
        // Select the first 7 words
        selectedWords = words.slice(0, 7).map((word, index) => ({
            word,
            color: colors[index],
            spaces: Math.floor(Math.random() * 8) + 1, // Random spaces between 1 and 8
        }));
        selectedWords = shuffle(selectedWords);
        score = 0;
        gameOver = false;
        currentColor = colors[currentColorIndex];
    }

    function playAudio(color) {
        if (audio) {
            audio.pause();
            audio = null;
        }
        audio = new Audio(`/audio/${color}.mp3`);
        audio.play();
    }

    function playSoundEffect(sound) {
        const soundEffect = new Audio(`/audio/${sound}.mp3`);
        soundEffect.play();
    }

    function checkWord(selectedColor) {
        if (selectedColor === currentColor) {
            message = "👍 Correct!";
            showMessage = true;
            score++;
            playSoundEffect("coin-quiet"); // Play correct sound effect

            if (currentColorIndex === colors.length - 1) {
                gameOver = true;
                message = `Game Over! Your score: ${score}`;
            } else {
                currentColorIndex++;
                currentColor = colors[currentColorIndex];
                setTimeout(() => {
                    showMessage = false;
                    playAudio(currentColor);
                }, 1000); // Show message for 1 second
            }
        } else {
            message = "😔 Try again!";
            showMessage = true;
            playSoundEffect("blip"); // Play incorrect sound effect
            setTimeout(() => {
                showMessage = false;
            }, 1000); // Show message for 1 second
        }
    }

    function handleStart() {
        gameStarted = true;
        colors = shuffle(colors);
        currentColorIndex = 0;
        startGame();
        playAudio(currentColor);
    }
</script>

<div class="container mx-auto p-4 text-center flex flex-col min-h-screen">
    <!-- Game Title -->
    <h1 class="text-4xl font-bold mb-8">Color Words Game</h1>

    <!-- Core Game Area -->
    <div class="flex-grow flex flex-col items-center justify-center">
        {#if !gameStarted}
            <!-- Start Game Button -->
            <button on:click={handleStart} class="btn btn-primary">
                Start Game
            </button>
        {:else}
            <!-- Game Grid -->
            <div class="grid grid-cols-2 gap-4">
                {#each selectedWords as { word, color }}
                    <button
                        on:click={() => checkWord(color)}
                        class="btn p-4 text-6xl m-4 text-black {color} w-80 h-24 text-6xl"
                        disabled={gameOver}
                    >
                        {word}
                    </button>
                {/each}
            </div>
        {/if}

        <!-- Message Overlay -->
        {#if showMessage}
            <div
                transition:fade={{ duration: 200 }}
                class="absolute inset-0 flex items-center justify-center message-overlay"
            >
                <div
                    class="bg-base-300 text-4xl font-bold p-8 rounded-lg shadow-xl"
                >
                    {message}
                </div>
            </div>
        {/if}
    </div>

    <!-- Bottom Bar -->
    <footer
        class="fixed bottom-0 left-0 right-0 bg-base-300 shadow-lg p-4 flex justify-between items-center"
    >
        <!-- Progress Indicators -->
        <div class="text-left">
            <p class="text-xl font-semibold">
                Color {currentColorIndex + 1} of {colors.length}
            </p>
        </div>

        <!-- Buttons -->
        <div class="flex gap-4">
            <!-- Reset Game Button -->
            <button on:click={playAgain} class="btn btn-error">
                Reset Game
            </button>

            <!-- Exit Game Button -->
            <a href="/" class="btn btn-warning"> Exit Game </a>
        </div>
    </footer>
</div>

<style>
    .container {
        max-width: 800px;
        margin: 0 auto;
    }

    /* Color-specific button styles */
    button.green {
        background-color: var(--color-green-500);
    }
    button.blue {
        background-color: var(--color-blue-500);
    }
    button.pink {
        background-color: oklch(0.823 0.12 346.018);
    }
    button.yellow {
        background-color: oklch(0.795 0.184 86.047);
    }
    button.orange {
        background-color: oklch(0.705 0.213 47.604);
    }
    button.purple {
        background-color: oklch(0.627 0.265 303.9);
    }
    button.red {
        background-color: oklch(0.637 0.237 25.331);
    }
    .message-overlay {
        background: rgba(0, 0, 0, 0.2);
    }
</style>
