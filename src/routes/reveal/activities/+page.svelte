<script>
    import TileGameContainer from "$lib/TileGameContainer.svelte";

    const imageSet = [
        {
            imageUrl: "/images/pianogirl.webp",
            answer: "play the piano",
        },
        {
            imageUrl: "/images/boyswim.webp",
            answer: "go swimming",
        },
        {
            imageUrl: "/images/girlonpony.webp",
            answer: "ride a pony",
        },
    ];
</script>

<main class="min-h-screen w-full">
    <TileGameContainer {imageSet} />
</main>
