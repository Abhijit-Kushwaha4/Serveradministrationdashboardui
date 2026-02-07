
import Bytez from "bytez.js";

// Load API key from environment variable
const key = process.env.REACT_APP_BYTEZ_API_KEY || process.env.VITE_BYTEZ_API_KEY;

if (!key) {
  throw new Error(
    "Missing BYTEZ_API_KEY. Please set REACT_APP_BYTEZ_API_KEY (for React) or VITE_BYTEZ_API_KEY (for Vite) environment variable."
  );
}

const sdk = new Bytez(key);

// Initialize vision-capable model for OCR
const ocrModel = sdk.model("deepseek/deepseek-vl2") || sdk.model("openai/gpt-4-vision") || sdk.model("llava-hf/llava-1.5-7b-hf");

// Placeholder for video generation jobs
const videoJobs: Record<string, { status: string, videoUrl?: string }> = {};

export async function runSora2Pro(prompt: string): Promise<{ jobId: string }> {
  console.log(`Starting video generation for prompt: "${prompt}"`);
  
  // Simulate starting a job
  const jobId = `job_${Date.now()}`;
  videoJobs[jobId] = { status: "processing" };

  // Simulate a delay for the video generation
  setTimeout(() => {
    // Once the video is "ready", update the job status and add a placeholder URL
    videoJobs[jobId] = {
      status: "completed",
      videoUrl: "https://test-videos.co.uk/vids/bigbuckbunny/mp4/h264/360/Big_Buck_Bunny_360_10s_1MB.mp4",
    };
    console.log(`Video for job ${jobId} is ready.`);
  }, 15000); // 15-second delay to simulate video processing

  return { jobId };
}

export async function getVideoStatus(jobId: string): Promise<{ videoUrl?: string }> {
  console.log(`Checking status for job: ${jobId}`);
  const job = videoJobs[jobId];

  if (job && job.status === "completed") {
    return { videoUrl: job.videoUrl };
  } else {
    return {};
  }
}

export async function runDeepseekOCR(imageInput: string): Promise<string> {
    // Validate image input format (URL, base64, or File path)
    if (!imageInput || typeof imageInput !== "string") {
        throw new Error("Invalid image input: must be a URL or base64-encoded string");
    }

    console.log(`Running OCR on image using vision-capable model...`);
    
    try {
        // Call vision-capable OCR model with image and prompt
        // Pass image parameter explicitly for vision-enabled models
        const { error, output } = await ocrModel.run({
            image: imageInput,
            prompt: "Extract all text from this image. Return only the extracted text content."
        });

        if (error) {
            console.error("OCR model error:", error);
            throw new Error(`OCR processing failed: ${error.message || "Unknown error"}`);
        }

        // Parse and return extracted text
        if (output) {
            const extractedText = typeof output === "string" ? output : output.toString();
            console.log("OCR completed successfully");
            return extractedText;
        }

        console.warn("OCR returned empty result");
        return "";
    } catch (error) {
        console.error("Error running OCR:", error);
        throw error;
    }
}
