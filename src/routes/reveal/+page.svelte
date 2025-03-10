<script>
    import TileGameContainer from "$lib/TileGameContainer.svelte";

    const imageSet = [
        {
            imageUrl: "/images/test-bg.avif",
            answer: "bus",
        },
    ];
</script>

<main class="min-h-screen w-full">
    <TileGameContainer {imageSet} />
</main>
