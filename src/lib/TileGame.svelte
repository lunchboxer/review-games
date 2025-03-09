<script>
  const GRID_COLS = 6;
  const GRID_ROWS = 4;
  const TOTAL_TILES = GRID_COLS * GRID_ROWS;

  const alphabet = Array.from({ length: TOTAL_TILES }, (_, i) =>
    String.fromCharCode(65 + i),
  );

  let opacities = Array(TOTAL_TILES).fill(1);

  export let backgroundImage = "/images/test-bg.avif";

  /**
   * @param {number} index
   */
  function fadeTile(index) {
    opacities[index] = 0;
    opacities = [...opacities]; // Trigger reactivity
  }
</script>

<div
  class="relative w-full h-screen overflow-hidden"
  style="background-image: url('{backgroundImage}'); background-size: cover; background-position: center;"
>
  <div class="tile-grid absolute inset-0 grid">
    {#each alphabet as letter, index}
      <button
        on:click={() => fadeTile(index)}
        style:opacity={opacities[index]}
        class="tile bg-base-200 hover:bg-base-300 flex items-center justify-center text-2xl font-bold w-full h-full"
      >
        {letter}
      </button>
    {/each}
  </div>
  <div class="absolute top-4 left-4 z-10">
    <a href="/">
      <button
        class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      >
        Back to Home
      </button>
    </a>
  </div>
</div>

<style>
  .tile {
    transition: opacity 0.5s ease-in-out;
  }

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
