<script>
    import { onMount } from "svelte";
    import { fade } from "svelte/transition";

    export let data;
    const { imageSet } = data;

    const patterns = [
        "ABABAB",
        "ABBABB",
        "ABCCABCC",
        "AABBAABB",
        "ABABCABABC",
        "AABBCAABBC",
        "ABCDABCD",
        "AAABBBAAAB",
        "ABBCCABBCC",
        "ABACADABAC",
        "ABCABCABC",
    ];

    let currentPattern = "";
    let cards = [];
    let highlightIndex = 0;
    let gameRevealed = false;

    function generateGame() {
        imageSet.sort(() => 0.5 - Math.random());
        const randomIndex = Math.floor(Math.random() * patterns.length);
        currentPattern = patterns[randomIndex];

        cards = currentPattern.split("").map((letter) => {
            const imageIndex = letter.charCodeAt(0) - "A".charCodeAt(0);
            return {
                url: imageSet[imageIndex],
                alt: `Card ${letter}`,
                revealed: true,
            };
        });

        cards[cards.length - 1].revealed = false;
        highlightIndex = 0;
        gameRevealed = false;
    }

    /**
     * @param {number} index
     */
    function revealLastCard(index) {
        if (index === cards.length - 1 && !cards[index].revealed) {
            cards[index].revealed = true;
            gameRevealed = true;
        }
    }

    onMount(() => {
        generateGame();
    });

    function nextCard() {
        if (highlightIndex < cards.length - 1) {
            highlightIndex++;
        } else {
            revealLastCard(highlightIndex);
        }
    }

    const onkeydown = (/** @type {{ code: string; }} */ event) => {
        if (event.code === "Enter") {
            generateGame();
        }
        if (event.code === "Space" || event.code === "PageDown") {
            if (gameRevealed) {
                generateGame();
            } else {
                nextCard();
            }
        }
    };
</script>

<svelte:window {onkeydown} />

<main class="min-h-screen flex flex-col">
    <div class="flex-grow p-4 text-center">
        <h1 class="text-4xl font-bold mb-8">Word Series Game</h1>
        <!-- Added flex-grow wrapper -->
        <div class="flex gap-2 justify-center items-center my-5">
            {#each cards as card, index}
                <div
                    class="card w-[120px] h-[150px] relative rounded-lg overflow-hidden"
                    class:highlighted={index === highlightIndex}
                >
                    <img
                        src={card.url}
                        alt={card.alt}
                        class="w-full h-full object-contain"
                    />
                    {#if !card.revealed}
                        <div
                            role="button"
                            tabindex={card.revealed ? -1 : 0}
                            class="absolute inset-0 bg-gray-500 border-2 border-gray-600 rounded-lg"
                            on:click={() => revealLastCard(index)}
                            out:fade
                            on:keydown={(e) => {
                                if (e.key === "Enter" || e.key === " ") {
                                    revealLastCard(index);
                                }
                            }}
                        ></div>
                    {/if}
                </div>
            {/each}
        </div>
    </div>
    <!-- Close flex-grow wrapper -->

    <footer class="p-4 bg-base-300 flex justify-end items-center">
        <div class="space-x-2">
            <a class="btn btn-secondary" href="/">Leave Game</a>
            <button class="btn btn-primary" on:click={generateGame}>
                Next Round
            </button>
        </div>
    </footer>
</main>

<style>
    .highlighted {
        border: 2px solid var(--color-primary);
    }
</style>
