/* npm i bytez.js || yarn add bytez.js */

import Bytez from "bytez.js"

const key = "2622dd06541127bea7641c3ad0ed8859" 
const sdk = new Bytez(key)

// choose Qwen3-0.6B 
const model = sdk.model("Qwen/Qwen3-0.6B")

// send input to model 
const { error, output } = await model.run([ { "role": "user", "content": "Hello" } ])

console.log({ error, output });