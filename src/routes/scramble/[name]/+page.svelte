<script>
    import WordScrambleGame from "$lib/WordScrambleGame.svelte";
    export let data;
    const words = data.wordList;
</script>

<main class="min-h-screen flex items-center justify-center">
    <WordScrambleGame {words} />
</main>
