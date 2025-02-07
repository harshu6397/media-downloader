export type ContentType = 'video' | 'audio';

export interface DownloadHistory {
  title: string;
  url: string;
  platform: string;
  download_date: string;
  format?: string;
  filesize?: number;
  duration?: number;
}