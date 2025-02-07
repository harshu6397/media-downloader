export interface DownloadRequest {
  url: string;
  content_type: 'video' | 'audio';
  quality: string;
  format: string;
}

export interface DownloadResponse {
  task_id: string;
  status: string;
  message: string;
}

export interface ContentInfo {
  title: string;
  duration?: number;
  uploader?: string;
  formats?: Array<Record<string, any>>;
}

export interface PlatformFormats {
  video_formats: string[];
  audio_formats: string[];
  quality_options: Record<string, string>;
  audio_quality: Record<string, string>;
}