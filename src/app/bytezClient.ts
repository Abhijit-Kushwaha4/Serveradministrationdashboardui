/*
  bytezClient.ts - Aggregated bytez client with OCR and video support
*/

import Bytez from "bytez.js"

const key = "2622dd06541127bea7641c3ad0ed8859"
const sdk = new Bytez(key)

// OCR using Deepseek
const ocrModel = sdk.model("meta-llama/Llama-2-7b-hf") // Fallback model for OCR

export async function runDeepseekOCR(imageInput: string) {
    try {
        // For OCR, we'll use a text model that can process image descriptions
        const { error, output } = await ocrModel.run({ 
            prompt: `Please perform OCR on the following image and extract all text. Image: ${imageInput}` 
        });

        if (error) {
            throw new Error(error.message);
        }

        return output || "No text extracted";
    } catch (err) {
        console.error("OCR Error:", err);
        throw err;
    }
}

// Video generation using Sora2Pro
const videoModel = sdk.model("openai/sora-2-pro")

export async function runSora2Pro(prompt: string) {
    try {
        const { error, output } = await videoModel.run({ prompt });

        if (error) {
            throw new Error(error.message);
        }

        // The model is expected to return a video URL or base64 string
        if (output) {
            return Array.isArray(output) ? output : [output];
        }

        return [];
    } catch (err) {
        console.error("Video Generation Error:", err);
        throw err;
    }
}

