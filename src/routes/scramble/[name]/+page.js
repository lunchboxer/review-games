import { wordLists } from "$lib/database.js";
import { error } from "@sveltejs/kit";

export function load({ params }) {
    const {name} = params
    const wordList = wordLists[params.name];

    if (!wordList) {
        throw error(404, "Not Found");
    }

    return {
        wordList,
        name
    };
}
