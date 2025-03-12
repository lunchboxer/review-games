import { wordLists } from "$lib/database.js";
import { error } from "@sveltejs/kit";

export const load = async ({ params }) => {
    const wordList = wordLists[params.name];

    if (!wordList) {
        throw error(404, 'Not Found');
    }

    return {
        wordList,
        name: params.name,
    };
};
