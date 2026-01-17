
import Bytez from "bytez.js";

const key = "2622dd06541127bea7641c3ad0ed8859";
const sdk = new Bytez(key);

export async function runFluxDev(prompt: string) {
    const model = sdk.model("black-forest-labs/FLUX.1-dev");
    const { error, output } = await model.run(prompt);
    if (error) {
        throw new Error(error);
    }
    return output;
}
