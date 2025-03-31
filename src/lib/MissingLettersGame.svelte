<script>
    import { shuffle } from "$lib/utils.js";

    export let words;

    let shuffledWords = shuffle([...words]);
    let currentWordIndex = 0;
    let currentWord = shuffledWords[currentWordIndex];
    let missingLetters = getMissingLetters(currentWord.word);
    let selectedLetters = [];
    let score = 0;
    let feedback = "";

    $: shuffledChoices = shuffle([
        ...new Set([
            ...missingLetters.map((m) => m.letter),
            ...shuffle("abcdefghijklmnopqrstuvwxyz".split("")).slice(
                0,
                8 - missingLetters.length,
            ),
        ]),
    ]);

    function getMissingLetters(word) {
        let letters = word.split("");
        let missingCount = Math.min(2, letters.length);
        let missingIndices = shuffle([...Array(letters.length).keys()]).slice(
            0,
            missingCount,
        );
        return missingIndices.map((index) => ({
            index,
            letter: letters[index],
        }));
    }

    function selectLetter(letter) {
        if (missingLetters.some((m) => m.letter === letter)) {
            selectedLetters.push(letter);
            if (selectedLetters.length === missingLetters.length) {
                score += 10;
                feedback = "Correct!";
                setTimeout(nextWord, 1000);
            }
        } else {
            feedback = "Try again!";
        }
    }

    function nextWord() {
        currentWordIndex = (currentWordIndex + 1) % shuffledWords.length;
        currentWord = shuffledWords[currentWordIndex];
        missingLetters = getMissingLetters(currentWord.word);
        selectedLetters = [];
        feedback = "";
    }

    function displayWord() {
        let wordArray = currentWord.word.split("");
        return wordArray
            .map((letter, index) => {
                if (missingLetters.some((m) => m.index === index)) {
                    return selectedLetters.includes(letter) ? letter : "_";
                }
                return letter;
            })
            .join("");
    }
</script>

<div class="p-4">
    <div class="text-2xl font-bold">{displayWord()}</div>
    <div class="text-gray-500 text-sm mt-2">{currentWord.sentence}</div>
    <div class="mt-4">
        {#each shuffledChoices as letter}
            <button
                class="btn btn-primary m-1"
                on:click={() => selectLetter(letter)}>{letter}</button
            >
        {/each}
    </div>
    <div class="mt-4">
        <div class="text-lg">Score: {score}</div>
        <div class="text-lg">{feedback}</div>
    </div>
</div>

<audio src={currentWord.audioWord} autoplay></audio>
<audio src={currentWord.audioSentence} autoplay></audio>
