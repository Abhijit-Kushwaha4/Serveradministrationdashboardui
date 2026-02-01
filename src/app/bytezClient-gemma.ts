/*
  npm i bytez.js || yarn add bytez.js
*/

import Bytez from "bytez.js"

const key = "2622dd06541127bea7641c3ad0ed8859"
const sdk = new Bytez(key)

// choose gemma-3-4b-it
const model = sdk.model("google/gemma-3-4b-it")

// send input to model
const { error, output } = await model.run([
  {
    "role": "user",
    "content": "Hello"
  }
])

console.log({ error, output });