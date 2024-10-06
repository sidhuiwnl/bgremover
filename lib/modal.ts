import { pipeline, Pipeline } from "@xenova/transformers";

// Define the type for the pipeline function
type PipelineTask = 'text-classification';
type ProgressCallback = (progress: number) => void;

class PipelineSingleton {
  static task: PipelineTask = 'text-classification';
  static model: string = 'Xenova/distilbert-base-uncased-finetuned-sst-2-english';
  static instance: Pipeline | null = null;

  // Static method to get the singleton instance with optional progress callback
  static async getInstance(progress_callback: ProgressCallback | null = null): Promise<Pipeline> {
    if (this.instance === null) {
      this.instance = await pipeline(this.task, this.model, { progress_callback });
    }
    return this.instance;
  }
}

let SingletonInstance: typeof PipelineSingleton;
if (process.env.NODE_ENV !== 'production') {
  if (!globalThis.PipelineSingleton) {
    globalThis.PipelineSingleton = PipelineSingleton;
  }
  SingletonInstance = globalThis.PipelineSingleton;
} else {
  SingletonInstance = PipelineSingleton;
}

export default SingletonInstance;
