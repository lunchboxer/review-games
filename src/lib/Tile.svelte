<script>
    export let letter;
    export let opacity = 1;
</script>

<button
    on:click
    class:visible={opacity}
    class="tile bg-base-200 hover:bg-base-300 flex items-center justify-center text-2xl font-bold w-full h-full"
>
    {letter}
</button>

<style>
    .tile {
        opacity: 1;
        transition: none;
    }

    .tile:not(.visible) {
        opacity: 0;
        transition: opacity 0.8s ease;
    }
</style>
