<script>
    import TileGameContainer from "$lib/TileGameContainer.svelte";

    export let data;
</script>

<main class="min-h-screen w-full">
    <TileGameContainer imageSet={data.imageSet} />
</main>
