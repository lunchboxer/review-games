<script>
  import ColorWordsGame from "$lib/ColorWordsGame.svelte";

  let words = [
    "carrots",
    "banana",
    "apple",
    "steak",
    "chicken",
    "peas",
    "cake",
    "pizza",
    "sandwich",
    "sausage",
  ];
</script>

<main
  class="container prose w-full max-w-screen-md mx-auto p-4 flex flex-col min-h-screen"
>
  <h1>Lunch Time</h1>
  <p>Listen. When you hear a color. Say the word.</p>

  <ColorWordsGame {words} />
</main>
