<script>
  import { onMount } from "svelte";
  import { fade } from "svelte/transition";

  const imageUrls = [
    "/images/duck.png",
    "/images/bird_blue.png",
    "/images/egret.png",
    "/images/rooster.png",
    "/images/penguin.png",
    "/images/swan.png",
  ];

  const patterns = [
    "ABABAB",
    "ABBABB",
    "ABCCABCC",
    "AABBAABB",
    "ABABCABABC",
    "AABBCAABBC",
    "ABCDABCD",
    "AAABBBAAAB",
    "ABBCCABBCC",
    "ABACADABAC",
    "ABCABCABC",
  ];

  let currentPattern = "";
  let cards = [];
  let highlightIndex = 0;
  let gameRevealed = false;

  function generateGame() {
    imageUrls.sort(() => 0.5 - Math.random());
    const randomIndex = Math.floor(Math.random() * patterns.length);
    currentPattern = patterns[randomIndex];

    cards = currentPattern.split("").map((letter) => {
      const imageIndex = letter.charCodeAt(0) - "A".charCodeAt(0);
      return {
        url: imageUrls[imageIndex],
        alt: `Card ${letter}`,
        revealed: true,
      };
    });

    cards[cards.length - 1].revealed = false;
    highlightIndex = 0;
    gameRevealed = false;
  }

  function revealLastCard(index) {
    if (index === cards.length - 1 && !cards[index].revealed) {
      cards[index].revealed = true;
      gameRevealed = true;
    }
  }

  onMount(() => {
    generateGame();
  });

  function nextCard() {
    if (highlightIndex < cards.length - 1) {
      highlightIndex++;
    } else {
      revealLastCard(highlightIndex);
    }
  }

  const onkeydown = (event) => {
    if (event.code === "Enter") {
      generateGame();
    }
    if (event.code === "Space") {
      if (gameRevealed) {
        generateGame();
      } else {
        nextCard();
      }
    }
  };
</script>

<svelte:window {onkeydown} />

<main class="p-4 min-h-screen">
  <div class="flex gap-2 justify-center my-5">
    {#each cards as card, index}
      <div
        class="card w-[120px] h-[150px] relative rounded-lg overflow-hidden"
        class:highlighted={index === highlightIndex}
      >
        <img src={card.url} alt={card.alt} class="w-full h-full object-cover" />
        {#if !card.revealed}
          <div
            role="button"
            tabindex={card.revealed ? -1 : 0}
            class="absolute inset-0 bg-gray-500 border-2 border-gray-600 rounded-lg"
            on:click={() => revealLastCard(index)}
            out:fade
            on:keydown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                revealLastCard(index);
              }
            }}
          ></div>
        {/if}
      </div>
    {/each}
  </div>
  <button class="btn btn-primary block mx-auto mt-5" on:click={generateGame}>
    Next Round
  </button>
</main>

<style>
  .highlighted {
    border: 2px solid var(--color-primary);
  }
</style>
