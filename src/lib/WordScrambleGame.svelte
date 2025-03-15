<script>
    export let words;

    // Game state
    let shuffledWords = shuffleArray([...words]);
    let currentWordIndex = 0;
    let score = 0;
    let scrambledWord = "";
    let userGuess = "";
    let gameCompleted = false;
    let showSuccess = false; // For success feedback

    // Shuffle the words array
    function shuffleArray(array) {
        return array.sort(() => Math.random() - 0.5);
    }

    // Shuffle a word
    function shuffleWord(word) {
        return word
            .split("")
            .sort(() => Math.random() - 0.5)
            .join("");
    }

    // Start the game
    function startGame() {
        if (currentWordIndex >= shuffledWords.length) {
            gameCompleted = true;
            return;
        }

        const word = shuffledWords[currentWordIndex];
        scrambledWord = shuffleWord(word);
        userGuess = "";
    }

    // Handle tile click
    function handleTileClick(letter) {
        userGuess += letter;

        if (userGuess === shuffledWords[currentWordIndex]) {
            score += 10;

            // Show success feedback
            showSuccess = true;
            setTimeout(() => (showSuccess = false), 1000); // Hide after 1 second

            // Check if the game is completed before incrementing the index
            if (currentWordIndex + 1 >= shuffledWords.length) {
                gameCompleted = true;
            } else {
                currentWordIndex++;
                startGame();
            }
        }
    }

    // Reset the current word input
    function resetInput() {
        userGuess = "";
    }

    // Reset the entire game
    function resetGame() {
        shuffledWords = shuffleArray([...words]);
        currentWordIndex = 0;
        score = 0;
        gameCompleted = false;
        startGame();
    }

    startGame();
</script>

<div class="mx-auto p-4 text-center flex flex-col min-h-screen">
    <!-- Game Title -->
    <h1 class="text-4xl font-bold mb-8">Word Scramble Game</h1>

    <!-- Core Game Area -->
    <div class="flex-grow flex flex-col items-center justify-center">
        <!-- Success Feedback -->
        {#if showSuccess}
            <div
                class="absolute inset-0 flex items-center justify-center bg-green-500 bg-opacity-75 transition-opacity duration-500"
            >
                <p class="text-6xl font-bold text-white animate-bounce">
                    Correct!
                </p>
            </div>
        {/if}

        {#if !gameCompleted}
            <div class="my-4 min-h-48">
                <p class="text-6xl font-semibold">
                    {userGuess}
                </p>
            </div>
            <div class="grid grid-cols-5 gap-4 mb-4">
                {#each scrambledWord.split("") as letter}
                    <button
                        class="bg-blue-500 text-white text-6xl font-bold p-4 rounded-lg shadow-md hover:bg-blue-600 transition-transform transform active:scale-95 active:bg-blue-400"
                        on:click={() => handleTileClick(letter)}
                    >
                        {letter}
                    </button>
                {/each}
            </div>
        {:else}
            <!-- Game Completion Screen -->
            <div class="text-center">
                <h2 class="text-3xl font-bold mb-4">Congratulations!</h2>
                <p class="text-xl mb-4">
                    You've completed the game with a score of <span
                        class="text-green-600">{score}</span
                    >.
                </p>
                <button on:click={resetGame} class="btn btn-primary"
                    >Play Again</button
                >
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
                Word {currentWordIndex + 1} of {shuffledWords.length}
            </p>
            <p class="text-xl font-semibold">Score: {score}</p>
        </div>

        <!-- Buttons -->
        <div class="flex gap-4">
            <!-- Reset Input Button -->
            <button on:click={resetInput} class="btn btn-error">
                Reset Input
            </button>

            <a href="/" class="btn btn-warning"> Exit Game </a>
        </div>
    </footer>
</div>

<style>
    /* Animation for success feedback */
    @keyframes bounce {
        0%,
        100% {
            transform: translateY(0);
        }
        50% {
            transform: translateY(-20px);
        }
    }

    .animate-bounce {
        animation: bounce 0.5s infinite;
    }
    /* Button press feedback */
    .active\:scale-95:active {
        transform: scale(0.95);
    }
</style>
