import { imageSets } from "$lib/database.js";
import { error } from "@sveltejs/kit";

export function load({ params }) {
    const imageSet = imageSets[params.name];

    if (!imageSet) {
        throw error(404, "Not Found");
    }

    return {
        imageSet,
    };
}
