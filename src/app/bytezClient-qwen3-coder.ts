/*
  npm i bytez.js || yarn add bytez.js
*/

import Bytez from "bytez.js"

const key = "2622dd06541127bea7641c3ad0ed8859"
const sdk = new Bytez(key)

// choose Qwen3-Coder-30B-A3B-Instruct
const model = sdk.model("Qwen/Qwen3-Coder-30B-A3B-Instruct")

// send input to model
const { error, output } = await model.run([
  {
    "role": "user",
    "content": "Hello"
  }
])

console.log({ error, output });