<script>
    import ColorWordsGame from "$lib/ColorWordsGame.svelte";

    export let data;

    $: title =
        data.name === "lunch" ? "Lunch Time" : "Color Words: Days of the Week";
    $: instructions = "Listen. When you hear a color. Say the word.";
</script>

<main class="w-full max-w-screen-md mx-auto p-4 flex flex-col min-h-screen">
    <header class="prose">
        <h1>{title}</h1>
        <p>{instructions}</p>
    </header>

    <ColorWordsGame words={data.wordList} />
</main>
