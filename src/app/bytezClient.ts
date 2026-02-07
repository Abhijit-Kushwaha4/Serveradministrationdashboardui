
import Bytez from "bytez.js";

const key = "2622dd06541127bea7641c3ad0ed8859";
const sdk = new Bytez(key);

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
