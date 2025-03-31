import { series } from "$lib/database.js";
import { error } from "@sveltejs/kit";

export function load({ params }) {
    const imageSet = series[params.set];

    if (!imageSet) {
        throw error(404, "Not Found");
    }

    return {
        imageSet,
    };
}
