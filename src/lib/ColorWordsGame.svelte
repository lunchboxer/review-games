<script>
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

  function playAgain() {
    gameStarted = true;
    gameOver = false;
    score = 0;
    currentColorIndex = 0;
    shuffleArray(colors);
    shuffleArray(words);
    startGame();
    playAudio(currentColor);
    showMessage = false;
  }
  function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
  }
  shuffleArray(colors);
  shuffleArray(words);

  function startGame() {
    // Select the first 7 words
    selectedWords = words.slice(0, 7).map((word, index) => ({
      word,
      color: colors[index],
      spaces: Math.floor(Math.random() * 8) + 1, // Random spaces between 1 and 8
    }));
    shuffleArray(selectedWords);
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

  function checkWord(selectedColor) {
    if (selectedColor === currentColor) {
      message = "Correct!";
      showMessage = true;
      score++;
      // Select a new random color and play its audio
      currentColorIndex = (currentColorIndex + 1) % colors.length;

      if (currentColorIndex === 0) {
        gameOver = true;
        message = `Game Over! Your score: ${score}`;
        //Show message for longer on game over.
        setTimeout(() => {
          showMessage = false;
        }, 3000);
      } else {
        currentColor = colors[currentColorIndex];
        setTimeout(() => {
          showMessage = false;
          playAudio(currentColor);
        }, 1000); // Show message for 1 second
      }
    } else {
      message = "Try again!";
      showMessage = true;
      setTimeout(() => {
        showMessage = false;
      }, 1000); // Show message for 1 second
    }
  }

  function handleStart() {
    gameStarted = true;
    shuffleArray(colors);
    currentColorIndex = 0;
    startGame();
    playAudio(currentColor);
  }
</script>

<div class="buttons py-2 flex gap-2">
  {#if gameOver}
    <button on:click={playAgain} class="btn btn-primary"> Play Again </button>
  {/if}
  <button on:click={() => history.back()} class="btn btn-secondary">
    Back
  </button>
  {#if !gameStarted}
    <button class="btn btn-primary" on:click={handleStart}>Start Game</button>
  {/if}
</div>
{#if gameStarted}
  <section
    class="words relative w-full flex-1 flex flex-wrap justify-center items-center"
  >
    {#each selectedWords as { word, color }}
      <button
        on:click={() => checkWord(color)}
        class="btn btn-xl p-12 m-4 text-black {color}"
        disabled={gameOver}
      >
        {word}
      </button>
    {/each}
  </section>
{/if}

{#if showMessage}
  <div class="absolute inset-0 flex items-center justify-center">
    <div
      class="bg-primary text-black text-4xl font-bold p-8 rounded-lg shadow-lg"
    >
      {message}
    </div>
  </div>
{/if}

<style>
  .words button {
    font-size: 3.5rem;
  }
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
</style>
