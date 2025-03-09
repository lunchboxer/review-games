<script>
  import ColorWordsGame from "$lib/ColorWordsGame.svelte";

  let words = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ];
</script>

<main class="w-full max-w-screen-md mx-auto p-4 flex flex-col min-h-screen">
  <header class="prose">
    <h1>Color Words: Days of the Week</h1>
    <p>Listen. When you hear a color. Say the word.</p>
  </header>

  <ColorWordsGame {words} />
</main>
