<script>
    export let words;

    // Game state
    let shuffledWords = shuffleArray([...words]);
    let currentWordIndex = 0;
    let score = 0;
    let scrambledWord = "";
    let userGuess = "";
    let gameCompleted = false;

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

    function resetGame() {
        shuffledWords = shuffleArray([...words]);
        currentWordIndex = 0;
        score = 0;
        gameCompleted = false;
        startGame();
    }

    startGame();
</script>

<div class="container mx-auto p-4 text-center flex flex-col min-h-screen">
    <!-- Game Title -->
    <h1 class="text-4xl font-bold mb-8">Word Scramble Game</h1>

    <!-- Core Game Area -->
    <div class="flex-grow flex flex-col items-center justify-center">
        <!-- Scrambled Tiles -->
        {#if !gameCompleted}
            <div class="grid grid-cols-5 gap-4 mb-8">
                {#each scrambledWord.split("") as letter}
                    <button
                        class="bg-blue-500 text-white text-6xl font-bold p-4 rounded-lg shadow-md hover:bg-blue-600"
                        on:click={() => handleTileClick(letter)}
                    >
                        {letter}
                    </button>
                {/each}
            </div>

            <!-- User Input -->
            <div class="my-8 min-h-64">
                <p class="text-6xl font-semibold">
                    {userGuess}
                </p>
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
    .container {
        max-width: 800px;
        margin: 0 auto;
    }
</style>
