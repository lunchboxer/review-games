<script>
    import ColorWordsGame from "$lib/ColorWordsGame.svelte";

    export let data;
</script>

<main class="min-h-screen flex items-center justify-center">
    <ColorWordsGame words={data.wordList} />
</main>
