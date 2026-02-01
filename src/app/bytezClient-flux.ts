/*
  npm i bytez.js || yarn add bytez.js
*/

import Bytez from "bytez.js"

const key = "2622dd06541127bea7641c3ad0ed8859"
const sdk = new Bytez(key)

// choose FLUX.1-dev
const model = sdk.model("Black-MAD/FLUX.1-dev")

export async function runFluxDev(prompt: string) {
    const { error, output } = await model.run({ prompt });

    if (error) {
        throw new Error(error.message);
    }

    // The model is expected to return an array of image URLs or base64 strings.
    // Bytez.js might return a single URL or an array.
    if (output) {
        return Array.isArray(output) ? output : [output];
    }

    return [];
}
