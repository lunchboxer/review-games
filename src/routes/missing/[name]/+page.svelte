<script>
    import MissingLettersGame from "$lib/MissingLettersGame.svelte";

    export let data;
    const { words } = data;
</script>

<MissingLettersGame {words} />
