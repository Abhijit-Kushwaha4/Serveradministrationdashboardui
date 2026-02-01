/*
  npm i bytez.js || yarn add bytez.js
*/

import Bytez from "bytez.js"

const key = "2622dd06541127bea7641c3ad0ed8859"
const sdk = new Bytez(key)

// choose Qwen3-Coder-30B-A3B-Instruct
const model = sdk.model("Qwen/Qwen3-Coder-30B-A3B-Instruct")

export async function runQwenCoder(prompt: string) {
    const { error, output } = await model.run([
        {
            "role": "user",
            "content": prompt
        }
    ]);

    if (error) {
        throw new Error(error.message);
    }
    
    if (output && output.length > 0 && output[0].content) {
        return output[0].content;
    }

    return "";
}
