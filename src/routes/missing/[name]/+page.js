import { wordLists } from '$lib/database.js'

 export async function load({ params }) {
    const { name } = params;
    const words = wordLists[name] || [];
    console.log("+page.js words is", words)
    return {
        words,
        name
    };
  }
